///<reference path='types/backbone.d.ts'/>
///<reference path='types/enchant.d.ts'/>
module enchant {
  export class Model extends Backbone.Model {
    constructor(props?){
      super(props);
      for(var key in this.attributes){
        var val = this.attributes[key];
        Object.defineProperty(this, key,{
          get : () => this.get(key),
          set : (val) => this.set(key, val)
        });
      }
    }
  }

  export class Collection extends Backbone.Collection {
    constructor(props?){
      super(props);
    }
  }

  export class ViewModel extends enchant.Group {
    public model: enchant.Model;
    constructor(model: enchant.Model){
      super();
      this.model = model;
    }
  }

  export class HTMLObject extends enchant.Label {
    view: Backbone.View;
    constructor(html?) {
      super();
      this.view = new Backbone.View;
      this.view.setElement(this._element);
      this.html = html || '';
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
