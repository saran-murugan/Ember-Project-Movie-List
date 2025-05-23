import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MoviesService extends Service {
  @tracked columnName = [
    { name: 'name', label: 'Name' },
    { name: 'year', label: 'Year' },
    { name: 'genre', label: 'Genre' },
    { name: 'format', label: 'Format' },
    { name: 'languages', label: 'Languages' },
  ];
  @tracked optionsColumn = { name: 'options', label: 'Options' };

  @tracked nestedColumns = [
    { name:'description', label:'Description' },
    { name:'cast', label:'Cast' },
  ]

  @tracked moviesList = [
    {
      id: 1,
      name: 'Pursuit of Happyness',
      year: 2006,
      genre: 'Biography, Drama',
      format: '2D',
      languages: ['English', 'Tamil'],
      cast: 'Will Smith, Jaden Smith, Thandiwe Newton',
      description:
        "A biographical drama depicting Chris Gardner's struggle with homelessness while raising his son and pursuing a career as a stockbroker.",
      isSelected: false,
    },
    {
      id: 2,
      name: 'Robin-B-Hood',
      year: 2000,
      genre: ' Drama, Action, Comedy',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Jackie Chan, Louis Koo, Michael Hui, Charlene Choi',
      description:
        'A Hong Kong action-comedy where a burglar is forced to kidnap a baby, leading to unexpected challenges and comedic situations.',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Fight Club',
      year: 1999,
      genre: ' Thriller, Psychological, Drama',
      format: '2D',
      languages: ['English', 'Tamil'],
      cast: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
      description:
        'A psychological drama about an insomniac office worker who forms an underground fight club that evolves into something much more.',
      isSelected: false,
    },
    {
      id: 4,
      name: 'Shutter Island',
      year: 2010,
      genre: ' Mystery, Psychological, Thriller',
      format: '2D',
      languages: ['English', 'Tamil', 'Hindi'],
      cast: 'Leonardo DiCaprio, Mark Ruffalo, Ben Kingsley',
      description:
        'A U.S. Marshal investigates the disappearance of a patient from a mental institution on Shutter Island, uncovering shocking secrets.',
      isSelected: false,
    },
    {
      id: 5,
      name: 'Friends',
      year: 1994,
      genre: ' Sitcom, Drama, Love, Comedy',
      format: '3D',
      languages: ['English'],
      cast: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc, Matthew Perry, David Schwimmer',
      description:
        'A sitcom following six friends navigating life and love in New York City.',
      isSelected: false,
    },
    {
      id: 6,
      name: 'Charlie',
      year: 2015,
      genre: ' Love, Drama, Adventure',
      format: '3D',
      languages: ['Tamil', 'Malayalam'],
      cast: 'Dulquer Salmaan, Parvathy Thiruvothu, Aparna Gopinath, Nedumudi Venu',
      description:
        'A young woman follows the trail of a mysterious wanderer named Charlie, uncovering stories of the lives he’s touched, leading to a magical and unexpected journey.',
      isSelected: false,
    },
    {
      id: 7,
      name: 'Chronicles of Narnia',
      year: 2005,
      genre: ' Fantasy, Action, Family',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Georgie Henley, Skandar Keynes, William Moseley, Anna Popplewell, Ben Barnes',
      description:
        "Fantasy films based on C.S. Lewis's novels, following children who discover the magical land of Narnia.",
      isSelected: false,
    },
    {
      id: 8,
      name: 'Grown Ups',
      year: 2004,
      genre: ' Comedy, Drama, Family',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Adam Sandler, Kevin James, Chris Rock, David Spade, Rob Schneider',
      description:
        "A comedy about childhood friends reuniting after their basketball coach's death, leading to humorous situations.​",
      isSelected: false,
    },
    {
      id: 9,
      name: 'Harry Potter and the Goblet of Fire',
      year: 2001,
      genre: ' Fantasy, Mystery',
      format: '3D',
      languages: ['English', 'Tamil', 'Malayalam'],
      cast: 'Daniel Radcliffe, Rupert Grint, Emma Watson',
      description:
        'Harry competes in the Triwizard Tournament, facing dangerous tasks and uncovering dark plots.​',
      isSelected: false,
    },
    {
      id: 10,
      name: 'The Intern',
      year: 2015,
      genre: ' Comedy, Drama',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Robert De Niro, Anne Hathaway, Rene Russo',
      description:
        "A 70-year-old widower becomes a senior intern at an online fashion retailer, forming an unlikely friendship with the company's CEO.",
      isSelected: false,
    },
    {
      id: 11,
      name: 'Inception',
      year: 2010,
      genre: ' Sci-Fi, Action',
      format: 'IMAX',
      languages: ['English'],
      cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
      description:
        "A skilled thief is given a chance at redemption if he can successfully perform inception: planting an idea into a target's subconscious.",
      isSelected: false,
    },
    {
      id: 12,
      name: 'Harry Potter and the Deathly Hallows',
      year: 2001,
      genre: ' Fantasy, Mystery',
      format: '3D',
      languages: ['English', 'Tamil', 'Malayalam'],
      cast: 'Daniel Radcliffe, Rupert Grint, Emma Watson',
      description:
        "The final chapters of Harry's quest to defeat Voldemort, culminating in the Battle of Hogwarts.",
      isSelected: false,
    },
    {
      id: 13,
      name: 'Interstellar',
      year: 2014,
      genre: ' Sci-Fi, Adventure, Family',
      format: 'IMAX',
      languages: ['English'],
      cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
      description:
        "A team of explorers travels through a wormhole in space to ensure humanity's survival.",
      isSelected: false,
    },
    {
      id: 14,
      name: 'Grown Ups 2',
      year: 2006,
      genre: ' Comedy, Drama, Family',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Adam Sandler, Kevin James, Chris Rock, David Spade, Salma Hayek',
      description:
        'The friends move back to their hometown, facing new challenges and comedic adventures.',
      isSelected: false,
    },
    {
      id: 15,
      name: 'Harry Potter and the Order of Phoenix',
      year: 2005,
      genre: ' Fantasy, Mystery, Thriller',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Daniel Radcliffe, Rupert Grint, Emma Watson',
      description:
        "Harry forms 'Dumbledore's Army' to prepare for the return of Voldemort, facing opposition from the Ministry of Magic.",
      isSelected: false,
    },
    {
      id: 16,
      name: 'Avengers:Endgame',
      year: 2019,
      genre: ' Superheroes, Action, Thriller',
      format: 'IMAX',
      languages: ['English', 'Tamil', 'Malayalam'],
      cast: 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson',
      description:
        "The Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.​",
      isSelected: false,
    },
    {
      id: 17,
      name: 'Harry Potter and the Chamber of Secrets',
      year: 1998,
      genre: ' Fantasy, Mystery, Thriller',
      format: '3D',
      languages: ['English', 'Tamil', 'Malayalam'],
      cast: 'Daniel Radcliffe, Rupert Grint, Emma Watson',
      description:
        'Harry returns to Hogwarts and uncovers the mystery of the Chamber of Secrets and the monster within.​',
      isSelected: false,
    },
    {
      id: 18,
      name: 'Harry potter and the Half-Blood Prince',
      year: 2006,
      genre: ' Fantasy, Mystery, Thriller',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Daniel Radcliffe, Rupert Grint, Emma Watson',
      description:
        "Harry discovers a mysterious potions book and learns more about Voldemort's past.",
      isSelected: false,
    },
    {
      id: 19,
      name: 'Real steel',
      year: 2012,
      genre: ' Action, Thriller, Drama',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Hugh Jackman, Dakota Goyo, Evangeline Lilly',
      description:
        'In a future where robot boxing is a top sport, a former boxer and his son train a discarded robot to compete.',
      isSelected: false,
    },
    {
      id: 20,
      name: 'Lord of the Rings: Fellowship of the Ring',
      year: 1998,
      genre: ' Fantasy, Action, Thriller',
      format: '3D',
      languages: ['English', 'Tamil'],
      cast: 'Elijah Wood, Ian McKellen, Viggo Mortensen, Sean Astin, Orlando Bloom, John Rhys-Davies, Liv Tyler, Cate Blanchett, Hugo Weaving, Christopher Lee, Sean Bean',
      description:
        'Frodo Baggins, a young hobbit, sets out on a perilous journey to destroy a powerful ring that could doom the world. With a fellowship of allies, he must traverse dangerous lands to reach Mount Doom, all while being hunted by dark forces.',
      isSelected: false,
    },
  ];

  addMovie(movie) {
    this.moviesList = [...this.moviesList, movie];
  }
}
