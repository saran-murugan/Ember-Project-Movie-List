import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MoviesEditRoute extends Route {
  @service movies;
  @service router;

  setupController(controller,model){
    super.setupController(...arguments);
    controller.languages = [...model.movie.languages];
    controller.format = model.movie.format;
    console.log(controller.languages,controller.format);
  }

  model(params) {
    console.log(params);

    let movieId = parseInt(params.movie_id, 10);
    let movieIndex = this.movies.moviesList.findIndex( (movie) => movie.id === movieId, );
    let movie = this.movies.moviesList[movieIndex];

    if (!movie) {
      alert('Movie not found');
      this.router.transitionTo("movies.index");
    }

    console.log({movie: { ...movie }},movieIndex);
    return { movie: { ...movie }, movieIndex };
  }

}
