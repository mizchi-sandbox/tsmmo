module App.Scene {
  export class Field extends Base {
    cursor: UI.Cursor;

    constructor(){
      super();
      this.cursor = new UI.Cursor();
      this.addChild(this.cursor);

      this.on("enterframe", () => {
        console.log("field");
      });

      this.on(Event.A_BUTTON_DOWN, () => {
        game.switchScene('battle');
      });

      this.on(Event.B_BUTTON_DOWN, () => {
        game.switchScene('menu');
      });

    }
  }
}