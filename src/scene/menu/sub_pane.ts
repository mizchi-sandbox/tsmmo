module App.Scene {
  export class SubPane extends enchant.Group{
    window: SubWindow;
    constructor(public parent: enchant.Group) {
      super();
      this.window = new SubWindow(parent);
      this.addChild(this.window);
    }
  }

  export class SubWindow extends UI.SelectBox {
    constructor(parent){
      this.parent = parent;
      super();
    }

    setup(){
      var item1 = new UI.MenuItem("A");
      item1.setClickListener(()=> console.log("on A"));
      this.addMenuItem(item1);

      var item2 = new UI.MenuItem("B");
      item2.setClickListener(()=> console.log("on B"));
      this.addMenuItem(item2);
    }
  }

}