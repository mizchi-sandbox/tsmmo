declare var game: App.Game;
module App.UI {
  export class Menu extends enchant.Group {
    constructor() {
      super();
      this.x = 0;
      this.y = 0;
      var subPane = new SubPane(this)
        , mainPane = new MainPane(this)
        , cursor = new UI.Cursor();
      this.addChild(mainPane);
      this.addChild(subPane);
      this.addChild(cursor);
      subPane.window.update();
    }
  }
}
