import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';


export default class MovieListComponent extends Component {
  @service router;
  @service flashMessages;

  @tracked searchMovie = '';
  @tracked isMessage = false;
  @tracked selectedGenre = null;
  @tracked genres = [];
  @tracked isInfo = false;

  @tracked isNameCol = true;
  @tracked isYearCol = true; 
  @tracked isGenreCol =true;
  @tracked isFormatCol = true;
  @tracked isLanguageCol = true;
  @tracked isOptionsCol = true;
  
  constructor() {
    super(...arguments);
    this.genres = this.getUniqueGenres();
  }

  @action showNameCol(){
    this.isNameCol = !this.isNameCol;
  }
  @action showYearCol(){
    this.isYearCol = !this.isYearCol;
  }
  @action showGenreCol(){
    this.isGenreCol = !this.isGenreCol;
  }
  @action showFormatCol(){
    this.isFormatCol = !this.isFormatCol;
  }
  @action showLanguageCol(){
    this.isLanguageCol = !this.isLanguageCol;
  }
  @action showOptionsCol(){
    this.isOptionsCol = !this.isOptionsCol;
  }



  @action infoMessageShow(){
   this.isInfo = !this.isInfo;
  }
  @action hideInfo(){
    this.isInfo = false;
  }

  @action messageHidden() {
    this.isMessage = false;
  }

  get currentRoute() {
    return this.router.currentRouteName;
  }

  get moviesList() {
    return this.args.movies.moviesList;
  }

  @action routeChange(){
    if (this.currentRoute == "movies.index"){
      this.router.transitionTo("index");
    }
  }

  getUniqueGenres() {
    let allGenres = this.moviesList.flatMap((movie) => movie.genre.split(','));
    return [...new Set(allGenres), 'none'];
  }

  @action updateGenreFilter(selectedGenre) {
    this.selectedGenre = selectedGenre;
  }

  @action genreReset(){
    this.selectedGenre = null;
  }

  @action updateSearchMovie(event) {
    this.searchMovie = event.target.value;
  }

  get filteredMovieList() {
    if (this.searchMovie) {
      return this.moviesList.filter((movie) => movie.name.toLowerCase().includes(this.searchMovie.toLowerCase()),
      );
    }
    if (this.selectedGenre) {
      if (this.selectedGenre.includes('none')) {
        return this.moviesList;
      } else {
        return this.moviesList.filter((movie) => movie.genre.toLowerCase().includes(this.selectedGenre.toLowerCase()),
        );
      }
    }
    return this.moviesList;
  }

  @task *deleteMovieTask(movie) {
    try {
      yield new Promise((resolve) => setTimeout(resolve, 500));
      this.args.movies.moviesList = this.args.movies.moviesList.filter((m) => m !== movie,);
      this.flashMessages.success('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
      this.flashMessages.danger('Deletion Incomplete');
    }
  }

  @action selectMovie(movie) {
    this.args.movies.moviesList = this.args.movies.moviesList.map((m) => m.id === movie.id ? { ...m, isSelected: !m.isSelected } : m,);
  }

  @task *bulkDeleteTask() {
    try{
      let selectedMovies = this.args.movies.moviesList.filter((movie) => movie.isSelected);

      yield new Promise((resolve) => setTimeout(resolve, 500));
      this.args.movies.moviesList = this.args.movies.moviesList.filter((movie) => !movie.isSelected,);
      this.isMessage = true;

      if(selectedMovies.length == 0){
        this.flashMessages.warning("Select atleast one movie");
      }
      else if(selectedMovies.length > 0){
      this.flashMessages.success('Bulk deletion completed');
      }

    } catch (error) {
      console.error('Error during bulk delete:', error);
      this.flashMessages.danger('Bulk Deletion Incomplete');
    }
  }

  @action openDemoPage(event){
    event.preventDefault();
    this.router.transitionTo("movies.demo-page");
  }

  @action openCreatePage(event){
    event.preventDefault();
    this.router.transitionTo("movies.create");
  }
} 
  