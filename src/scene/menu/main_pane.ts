module App.Scene {
  export class MainPane extends enchant.Group{
    constructor(public parent: enchant.Group) {
      super();
      var main = new MainWindow(parent);
      this.addChild(main);
    }
  }

  export class MainWindow extends UI.Window {
    items: UI.MenuItem[];
    cursor_idx: number = 0;
    WIDTH = 200;
    HEIGHT = 200;

    constructor(public parent: enchant.Group) {
      super();
      var padding = 5;

      var width = this.WIDTH - padding * 2;
      this.height = this.HEIGHT - padding * 2;
      this.x = 50 + padding;
      this.y = 0 + padding;

      this.css({
        'background-color': 'grey',
      });

    }
  }
}