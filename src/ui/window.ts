module App.UI {
  export class Window extends enchant.HTMLObject {
    debug: bool = true;
    constructor(x?: number, y?: number, width?: number, height?: number) {
      super();
      if(this.debug)
        this.css({ border: '1px solid black' });
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
    }
  }
}