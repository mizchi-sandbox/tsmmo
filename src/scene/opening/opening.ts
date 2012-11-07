module App.Scene {
  export class Opening extends Base {
    constructor(){
      super();
      var label = new enchant.Label();
      label.x = game.width/2;
      label.y = game.height/2;
      label.text = "Opening";
      this.addChild(label);

      this.on(Event.A_BUTTON_DOWN,
        () => game.switchScene('field'))
    }
  }
}