import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MoviesRoute extends Route {
  @service movies;
  @service router;

  setupController(controller) {
    super.setupController(...arguments);
    controller.set('currentRoute', this.router.currentRouteName);

    this.router.on('routeDidChange', () => {
      controller.set('currentRoute', this.router.currentRouteName);
    });
  }

  model() {
    return this.movies;
  }
}
