module App.Scene {
  export class Menu extends Base {
    menu: UI.Menu;

    constructor(){
      super();
      //this.menu = new UI.Menu();
      //this.addChild(this.menu);
      this.on(Event.ENTER_FRAME , () => {
      });

      this.on(Event.B_BUTTON_DOWN, () => {
        game.switchScene('field');
      });

      var subPane = new SubPane(this)
        , mainPane = new MainPane(this)
        ;
      this.addChild(mainPane);
      this.addChild(subPane);
    }
  }
}