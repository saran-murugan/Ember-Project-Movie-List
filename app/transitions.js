export default function () {
  console.log('liquid-fire transitions working');

  this.transition(
    this.fromRoute('index'),
    this.toRoute('movies'),
    this.use('fade'),
  );
  this.transition(
    this.fromRoute('movies.index'),
    this.toRoute('movies.create'),
    this.use('toRight',{duration:500}),
  );
  this.transition(
    this.fromRoute('movies.index'),
    this.toRoute('movies.edit'),
    this.use('toLeft',{duration:500}),
  );
  this.transition(
    this.fromRoute('movies.index'),
    this.toRoute('movies.demo-page'),
    this.use('fade'),
  );
  this.transition(
    this.matchSelector(".key-info"),
    this.toValue(true),
    this.use('toDown',{duration:600}),
    this.reverse('toUp')
  );

}