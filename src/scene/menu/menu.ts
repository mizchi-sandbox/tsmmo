module App.Scene {

  class SubWindow extends UI.SelectBox {
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

  export class Menu extends Base {
    //menu: UI.Menu;

    constructor(){
      super();
      //this.menu = new UI.Menu();
      //this.addChild(this.menu);
      this.on(Event.ENTER_FRAME , () => {
      });

      this.on(Event.B_BUTTON_DOWN, () => {
        game.switchScene('field');
      });
      var root = new UI.Pane(null, 0, 0, game.width, game.height);

      var panes = root.splitVerticaly(0.2);
      var subPane = panes[0];
      var mainPane = panes[1];

      subPane.setWindow(new SubWindow(this));


      this.addChild(subPane);
      this.addChild(mainPane);

      //var subPane = new SubPane(this)
        //, mainPane = new MainPane(this)
        //;
      //this.addChild(mainPane);
      //this.addChild(subPane);
    }
  }
}