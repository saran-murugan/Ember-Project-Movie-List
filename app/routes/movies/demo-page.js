import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MoviesDemoPageRoute extends Route {
  @service movies;

  model() {
    return this.movies;
  }
}
