import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router;

  @action goToMovies(event) {
    event.preventDefault();
    this.router.transitionTo('movies.index');
  }
}
