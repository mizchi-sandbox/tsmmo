_.mixin({
  'cond': (tf, a, b) => {
    if(tf) return a;
    else  return b;
  }
});

interface underscore {
  cond(tf:bool, a:any, b:any);
}

interface Input {
  right: bool;
  left: bool;
  up: bool;
  down: bool;
  a: bool;
  b: bool;
}

module enchant {

  export class Canvas extends enchant.Sprite {
    surface: enchant.Surface;
    constructor() {
      var game = App.game;
      super(game.width, game.height);
      this.surface = new enchant.Surface(game.width, game.height);
    }
  }

  export class Model extends Backbone.Model {
    constructor(props?){
      super(props);
      _.each(this.attributes, (val, key) => {
        Object.defineProperty(this, key,{
          get : () => this.get(key),
          set : (val) => this.set(key, val)
        });
      });
    }
  }

  export class HTMLObject extends enchant.Label {
    view: Backbone.View;
    constructor() {
      super();
      this.view = new Backbone.View;
      this.view.setElement(this._element);
      this.html = '';
    }
    show(){
      this.css({visibility: 'visible'});
    }

    hide(){
      this.css({visibility: 'hidden'});
    }

    get html() {
      return this.view.$el.html();
    }

    set html(text:string) {
      this.view.$el.html(text);
    }

    css(props:any): void {
      this.view.$el.css(props);
    }

    get z() { return Number(this._element.style.zIndex);}
    set z(z) { this._element.style.zIndex = z; }

    setClassName(name: string): void {
      this.view.$el.className = name;
    }
  }
}
