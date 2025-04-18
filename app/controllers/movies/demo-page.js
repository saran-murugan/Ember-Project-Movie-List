import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MoviesDemoPageController extends Controller {
  @service movies;
  @service router;

  @tracked moviesToDisplay = [];
  @tracked startIndex = 0;
  @tracked firstMovieSet = 10;

  constructor() {
    super(...arguments);
    this.moviesToDisplay = this.loadInitialMovies();
  }

  loadInitialMovies() {
    return this.movies.moviesList.slice(this.startIndex, this.firstMovieSet);
  }

  /* //  For infinite scrolling and bidirectional scrolling functionality
  @action scrollingAbove(){
    console.log("before:",this.startIndex);

    if(this.startIndex === 0){
      let loopMovie = this.movies.moviesList.slice(-this.firstMovieSet);
      this.moviesToDisplay = [...loopMovie,...this.moviesToDisplay];
      this.startIndex = this.movies.moviesList.length - this.firstMovieSet;
      console.log("after:",this.startIndex);
      return;
    }

    console.log("scrolling Up",this.startIndex);

    if(this.moviesToDisplay.length <= this.movies.moviesList.length){
    let prevIndex = Math.max(this.startIndex - this.firstMovieSet,0);
    let newMovieSet = this.movies.moviesList.slice(prevIndex,this.startIndex);
    this.moviesToDisplay = [...newMovieSet,...this.moviesToDisplay];
    //this.startIndex = prevIndex; 
    console.log("displaylength:",this.moviesToDisplay.length);
    }
  } 
  @action idForFirstItem(movie){
    return movie.id;
  */

  @action scrollingBelow() {
    /*  console.log("scrolling down");
    console.log("startIndex",this.startIndex,"displaylength:",this.moviesToDisplay.length); */
    let nextIndex = this.startIndex + this.moviesToDisplay.length;
    let nextMovieSet = this.movies.moviesList.slice(
      nextIndex,
      this.moviesToDisplay.length + nextIndex,
    );
    console.log(nextIndex, nextMovieSet);
    if (nextMovieSet.length > 0) {
      this.moviesToDisplay = [...this.moviesToDisplay, ...nextMovieSet];
    }
  }

  @action goBack() {
    this.router.transitionTo('movies.index');
  }
}
