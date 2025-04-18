import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class MoviesEditController extends Controller {
  @service movies;
  @service router;
  @service flashMessages;

  @tracked languages = [];
  @tracked format = '';

  @action updateField(field, event) {
    this.model.movie[field] = event.target.value;
  }

  @action updateLang(event) {
    if (this.languages.includes(event.target.value)) {
      this.languages = this.languages.filter(
        (lang) => lang !== event.target.value,
      );
      console.log(this.languages);
    } else {
      this.languages = [...this.languages, event.target.value];
      console.log(this.languages);
    }
  }

  @action isLanguageInclude(lang) {
    return this.languages.includes(lang);
  }

  @action isFormatInclude(format) {
    return this.format.includes(format);
  }

  @task *saveEdit() {
    let { movie, movieIndex } = this.model;
    movie.languages = this.languages;
    if (movieIndex !== -1) {
      this.movies.moviesList = this.movies.moviesList.map((m, index) =>
        index === movieIndex ? { ...movie } : m,
      );
    }
    console.log(this.movies.moviesList);
    this.flashMessages.success('Edit Saved');
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    this.router.transitionTo('movies.index');
  }

  @action routeChange() {
    this.router.transitionTo('movies.index');
  }

  @task *cancelEdit() {
    this.flashMessages.info('Edit cancelled');
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    this.router.transitionTo('movies');
  }
}
