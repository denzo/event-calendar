export default function(){

  this.transition(
    this.toRoute(true),
    this.includingInitialRender(),
    this.use('fade')
  );

  this.transition(
    this.childOf('.liquid-bind-to-up'),
    this.use('toUp')
  );
}
