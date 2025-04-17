import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class MoviesCreateController extends Controller{

    @service movies;
    @service router;

    @tracked movieName = '';
    @tracked movieYear = '';
    @tracked movieGenre = '';
    @tracked format = '';
    @tracked languages = [];
    @tracked formTried = false;
  
    @action updateMovieName(event) {
      this.movieName = event.target.value;
    }
  
    @action updateMovieYear(event) {
      this.movieYear = event.target.value;
    }
  
    @action updateMovieGenre(event) {
      this.movieGenre = event.target.value;
    }
  
    @action updateFormat(selectedFormat) {
      this.format = selectedFormat;
    }
  
    @action toggleLanguage(language) {
      if (this.languages.includes(language)) {
        this.languages = this.languages.filter((lang) => lang !== language);
      } else {
        this.languages = [...this.languages, language];
      }
    }
  
    @action createMovie() {
      this.formTried = true;
  
      if ( !this.movieName || !this.movieYear || !this.movieGenre || !this.format || this.languages.length === 0 ){
        alert('Please fill in all fields.');
        return;
      }
  
      let newMovie = {
        id: this.movies.moviesList.length + 1,
        name: this.movieName,
        year: this.movieYear,
        genre: this.movieGenre,
        format: this.format,
        languages: this.languages,
        isSelected: false,
      };
      this.movies.addMovie(newMovie);
      console.log('Movie added:', newMovie);

      this.movieName = '';
      this.movieYear = '';
      this.movieGenre = '';
      this.format = '';
      this.languages = [];
      this.formTried = false;
      this.router.transitionTo('movies');
    }
  
    @action routeChange(){
      this.router.transitionTo('movies.index');
    }
  
    @action goBack() {
      this.router.transitionTo('movies');
    }
    
};