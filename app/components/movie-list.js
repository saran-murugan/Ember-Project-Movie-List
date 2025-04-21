import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class MovieListComponent extends Component {
  /*---------------constructor-------------------  */
  constructor() {
    super(...arguments);
    this.genres = this.getUniqueGenres();

    const savedColumnWidthsFromLocalStorage = localStorage.getItem('columnWidthsSaved');
    if (savedColumnWidthsFromLocalStorage) {
      this.columnWidths = JSON.parse(savedColumnWidthsFromLocalStorage);
    }

    const savedColumnVisibilityFromLocalStorage = localStorage.getItem('columnVisibilitySaved');
    if(savedColumnVisibilityFromLocalStorage){
      this.columnsOptions = JSON.parse(savedColumnVisibilityFromLocalStorage);
    }
  }
  /* ---------------------------------------------- */

  @service router;
  @service flashMessages;

  @tracked searchMovie = '';
  @tracked isMessage = false;
  @tracked selectedGenre = null;
  @tracked genres = [];
  @tracked isInfo = false;

                    /* specific Search functionality */

  @tracked specificSearch = {
    name: '',
    year: '',
    genre: '',
    format: '',
    languages: '',
  };

  @action updateSpecificSearch(column, event) {
    this.specificSearch = {...this.specificSearch,[column]: event.target.value.toLowerCase()};
  }
  
  /*  -------------------------------------------------  */

  /* for column resizing functionality */
  @tracked columnWidths = {
    name: 220,
    year: 150,
    genre: 250,
    format: 150,
    languages: 250,
  };

  saveColumnWidths() {
    localStorage.setItem( 'columnWidthsSaved', JSON.stringify(this.columnWidths));
  }

  @action resizeColumn(colName, event) {
    let startPosition = event.pageX;
    let startingWidth = this.columnWidths[colName];

    const mouseMove = (e) => {
      let newWidth = Math.max(100, startingWidth + (e.pageX - startPosition));
      this.columnWidths = { ...this.columnWidths, [colName]: newWidth };
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      this.saveColumnWidths();
    };
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  /*-------------------------------------------*/

  /* column show/hide functionality */

  @tracked isShowColumnDropdown = false;
  
  @tracked columnsOptions = [
    { name: 'name', labelName: 'Name', visible: true },
    { name: 'year', labelName: 'Year', visible: true },
    { name: 'genre', labelName: 'Genre', visible: true },
    { name: 'format', labelName: 'Format', visible: true },
    { name: 'languages', labelName: 'Languages', visible: true },
    { name: 'options', labelName: 'options', visible: true },
  ];
  @action toggleColumnDropdown() {
    this.isShowColumnDropdown = !this.isShowColumnDropdown;
  }
  @action hideColumnDropDown() {
    this.isShowColumnDropdown = false;
  }
  @action toggleColumn(colName) {
    let column = this.columnsOptions.find((column) => column.name === colName);
    column.visible = !column.visible;
    this.columnsOptions = [...this.columnsOptions];
    localStorage.setItem( 'columnVisibilitySaved', JSON.stringify(this.columnsOptions));
  }
  get isVisible() {
    return this.columnsOptions.reduce((accumulator, column) => {
      accumulator[column.name] = column.visible;
      return accumulator;
    }, {});
  }

  /*---------------------------------------------------*/

  /* Column data sorting functionality */

  @tracked sortingBy = '';
  @tracked sortingDirection = 'ascending';

  @action sortColumn(colToSort) {
    if (this.sortingBy === colToSort) {
      if (this.sortingDirection === 'ascending') {
        this.sortingDirection = 'descending';
      } else if (this.sortingDirection === 'descending') {
        this.sortingBy = '';
        this.sortingDirection = '';
      }
      console.log('before', this.sortingBy, this.sortingDirection);
    } else {
      this.sortingBy = colToSort;
      this.sortingDirection = 'ascending';
      console.log('after', this.sortingBy, this.sortingDirection);
    }
  }
  /*----------------------------------------------------- */

  /* Expand Nested table details functionality */

  @tracked NestedMovieId = null;

  @action showNestedDetails(movieId) {
    this.NestedMovieId = this.NestedMovieId === movieId ? null : movieId;
  }

  /* ----------------------------------------- */

  @action infoMessageShow() {
    this.isInfo = !this.isInfo;
  }
  @action hideInfo() {
    this.isInfo = false;
  }

  @action messageHidden() {
    this.isMessage = false;
  }

  get currentRoute() {
    return this.router.currentRouteName;
  }

  get columnName(){
    return this.args.movies.columnName;
  }
  get optionsColumn(){
    return this.args.movies.optionsColumn;
  }

  get moviesList() {
    return this.args.movies.moviesList;
  }

  @action routeChange() {
    if (this.currentRoute == 'movies.index') {
      this.router.transitionTo('index');
    }
  }

  getUniqueGenres() {
    let allGenres = this.moviesList.flatMap((movie) => movie.genre.split(','));
    return [...new Set(allGenres)];
  }

  @action updateGenreFilter(selectedGenre) {
    this.selectedGenre = selectedGenre;
  }

  @action genreReset() {
    this.selectedGenre = null;
  }

  @action updateSearchMovie(event) {
    this.searchMovie = event.target.value.toLowerCase();
  }

  /*--------- All filtering conditions ----------*/

  get filteredMovieList() {
    let filtered = this.moviesList;

    if (this.searchMovie) {
      filtered = filtered.filter(
        (movie) =>
          movie.name.toLowerCase().includes(this.searchMovie.toLowerCase()) ||
          String(movie.year).includes(this.searchMovie) ||
          movie.format.toLowerCase().includes(this.searchMovie) ||
          movie.languages
            .join(', ')
            .toLowerCase()
            .includes(this.searchMovie.toLowerCase()) ||
          movie.genre.toLowerCase().includes(this.searchMovie.toLowerCase()),
      );
    }
    if (this.selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre.toLowerCase().includes(this.selectedGenre.toLowerCase()),
      );
    }
    if (this.specificSearch) {
      filtered = filtered.filter((movie) => {
        return Object.entries(this.specificSearch).every(([key, value]) => {
          if (!value) return true;
          return String(movie[key]).toLowerCase().includes(value);
        });
      });
    }
    if (this.sortingBy) {
      filtered = filtered.slice().sort((a, b) => {
        let A = a[this.sortingBy];
        let B = b[this.sortingBy];
        /*console.log(A,B);*/
        if (typeof A === 'number' && typeof B === 'number') {
          return this.sortingDirection === 'ascending' ? A - B : B - A;
        }

        A = String(a[this.sortingBy]).toLowerCase();
        B = String(b[this.sortingBy]).toLowerCase();
        /*console.log(A,B); */
        if (A < B) return this.sortingDirection === 'ascending' ? -1 : 1;
        if (A > B) return this.sortingDirection === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }
  /*-------------------------------------------------------*/

  @task *deleteMovieTask(movie) {
    try {
      yield new Promise((resolve) => setTimeout(resolve, 500));
      this.args.movies.moviesList = this.args.movies.moviesList.filter(
        (m) => m !== movie,
      );
      this.flashMessages.success('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
      this.flashMessages.danger('Deletion Incomplete');
    }
  }

  /*------------------------------------------- */

  @action selectMovie(movie) {
    this.args.movies.moviesList = this.args.movies.moviesList.map((m) =>
      m.id === movie.id ? { ...m, isSelected: !m.isSelected } : m,
    );
  }

  @task *bulkDeleteTask() {
    try {
      let selectedMovies = this.args.movies.moviesList.filter(
        (movie) => movie.isSelected,
      );

      yield new Promise((resolve) => setTimeout(resolve, 500));
      this.args.movies.moviesList = this.args.movies.moviesList.filter(
        (movie) => !movie.isSelected,
      );
      this.isMessage = true;

      if (selectedMovies.length == 0) {
        this.flashMessages.warning('Select atleast one movie');
      } else if (selectedMovies.length > 0) {
        this.flashMessages.success('Bulk deletion completed');
      }
    } catch (error) {
      console.error('Error during bulk delete:', error);
      this.flashMessages.danger('Bulk Deletion Incomplete');
    }
  }

  /*-------------------------------------------*/

  @action openDemoPage(event) {
    event.preventDefault();
    this.router.transitionTo('movies.demo-page');
  }

  @action openCreatePage(event) {
    event.preventDefault();
    this.router.transitionTo('movies.create');
  }
}
