module App.UI {
  export class SelectBox extends Window {
    private items: MenuItem[] = [];
    private iterCursor: IterCursor;
    private im: InputManager;
    public parent: enchant.Group;

    constructor() {
      super(0, 0, 50, 200);
      this.im = new InputManager();
      this.z = 0;
      this.setup();
      this.iterCursor = new IterCursor(this.items);
      this.iterCursor.on('change', () => this.onChangeCursor());
      this.onChangeCursor();
      this.css({'background-color': 'wheat'});
      this.on(Event.ENTER_FRAME, () => this.update());
      this.locateItems();
    }

    setup(){}

    private locateItems(): void{
      _.each(this.items, (item, n) => {
        item.x = 15;
        item.y = n * 20;
        item.z = 10;
      });
    }

    update() {
      if(this.im.ready()){
        if(game.input.up)
          this.iterCursor.prev();
        else if(game.input.down)
          this.iterCursor.next();
        else if(game.input.a)
          this.iterCursor.getItem().fire();
      }
    }

    public addMenuItem(item: MenuItem): void{
      this.items.push(item);
      this.parent.addChild(item);
    }

    onChangeCursor() {
      _.each(this.items, (item: MenuItem, index: number) => {
        var color =  _.cond(
          index === this.iterCursor.idx,
          'red', 'black'
        );
        item.css({color: color});
      });
    }
  }
}
