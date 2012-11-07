module App.UI {
  export class Pane extends enchant.Group {
    debug: bool = false;
    right: Pane = null;
    left: Pane = null;
    upper: Pane = null;
    bottom: Pane = null;
    Pane: Pane[] = [];
    window: Window;

    constructor(
      public parent: any,
      x: number, y: number,
      public width?: number,
      public height?: number
    ) {
      super();
      this.x = x;
      this.y = y;
      if(this.parent instanceof App.Scene.Base){
        this.width = this.parent.width;
        this.height = this.parent.height;
      }
      this.window = new Window(0, 0, this.width, this.height);
      this.addChild(this.window);
    }

    setWindow(win: Window){
      this.removeChild(this.window);
      this.window = win;
      this.addChild(this.window);

    }

    public splitVerticaly(ratio: number): Pane[] {
      var rest = 1 - ratio;
      var left = new Pane(this,
        this.x, this.y,
        this.width * ratio, this.height);
      var right = new Pane(this,
        this.x + left.width, this.y,
        this.width * rest, this.height);

      this.Pane.push(left);
      this.Pane.push(right);
      return this.Pane;
    }

    public splitHorizontaly(ratio: number): Pane[] {
      var rest = 1 - ratio;
      var upper = new Pane(this,
        this.x, this.y,
        this.width, this.height * ratio);
      var bottom = new Pane(this,
        this.x, this.y + upper.height,
        this.width, this.height * rest);

      this.Pane.push(upper);
      this.Pane.push(bottom);
      return this.Pane;
    }

  }
}