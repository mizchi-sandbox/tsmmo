declare var game: App.Game;
module App.UI {

  export class MenuItem extends Pane {
    public index: number;
    public onClick: Function;
    constructor(html: string, index: number) {
      this.index = index;
      super(0, 0, 50, 20);
      this.html = html;
      this.onClick = () => {};

      this.view.delegateEvents({
        'click': () => this.onClick();
      });
    }
    setPosition(n: number){
      this.x = 15;
      this.y = n * 20;
      this.z = 10;
    }
  }

  export class IterCursor extends enchant.Model {
    idx: number;
    private defaults = {
      idx: 0
    };

    constructor(public items: MenuItem[]){
      super({idx: 0});
    }

    next() {
      this.idx = this.idx + 1;
      if(this.items.length === this.idx)
        this.idx = 0;
    }

    prev() {
      this.idx = this.idx - 1;
      if(this.idx < 0)
        this.idx = this.items.length - 1;
    }
  }

  export class SubWindow extends Pane {
    items: MenuItem[];
    iterCursor: IterCursor;

    constructor(public parent: enchant.Group) {
      super(0, 0, 50, 200);
      this.createMenuItems(3);
      this.z = 0;
      this.css({'background-color': 'wheat'});
      this.iterCursor = new IterCursor(this.items);
      this.iterCursor.on('change', () => this.update());

      var manager = new InputManager();
      this.on(enchant.Event.ENTER_FRAME, () => {
        if(!manager.isWaiting()){
          if(game.input.up)   this.iterCursor.prev();
          if(game.input.down) this.iterCursor.next();
        }
      });
    }

    private createMenuItems(n): void {
      this.items = _.map(_.range(n),  (i: number) => {
        var item = new MenuItem("item", i);
        item.setPosition(i);
        this.parent.addChild(item);
        return item;
      });
    }

    update() {
      _.each(this.items, (item: MenuItem, index: number) => {
        item.css({color:
          _.cond(index === this.iterCursor.idx,
            'red', 'black'
          )
        });
      });
    }
  }

  export class SubPane extends enchant.Group{
    window: SubWindow;
    constructor(public parent: enchant.Group) {
      super();
      this.window = new SubWindow(parent);
      this.addChild(this.window);
    }
  }
}