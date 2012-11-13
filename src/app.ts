///<reference path='types/underscore.d.ts'/>
///<reference path='types/backbone.d.ts'/>
///<reference path='types/enchant.d.ts'/>
///<reference path='backbone.enchant.ts'/>
///<reference path='misc.ts'/>
///<reference path='game/game.ts'/>
///<reference path='ui/pane.ts'/>
///<reference path='ui/window.ts'/>
///<reference path='ui/input_manager.ts'/>
///<reference path='ui/select_box/menu_item.ts'/>
///<reference path='ui/select_box/iter_cursor.ts'/>
///<reference path='ui/select_box/select_box.ts'/>
///<reference path='ui/menu.ts'/>
///<reference path='ui/cursor.ts'/>
///<reference path='scene/base.ts'/>
///<reference path='scene/opening/opening.ts'/>
///<reference path='scene/field/menu/menu.ts'/>
///<reference path='scene/field/field.ts'/>
///<reference path='scene/battle/battle.ts'/>
///<reference path='scene/manager.ts'/>


declare var _ : underscore;
declare var enchant : enchant;

module App {
  export var Event = enchant.Event;
  export var game: Main;

  export class Main extends enchant.Game {
    private scene_manager: Scene.Manager;
    constructor(){
      super()
      App.game = this;
      this.setup();
      this.onload = () => {
        this.scene_manager = new Scene.Manager(this);
        this.scene_manager.start();
      };

      var im = new UI.InputManager();
      this.on(Event.ENTER_FRAME, () => {
        var isReady: bool =  im.ready();
      });

      var x = new X.Main;
      x.start();

    }

    public switchScene(scene_name: string){
      this.scene_manager.set({context: scene_name});
    }

    private setup() {
      this.keybind('Z'.charCodeAt(0), "a");
      this.keybind('X'.charCodeAt(0), 'b');
      this.width = 400;
      this.height = 300;
      this.fps = 24;
      this.preload('images/chara1.png');
      this.rootScene.backgroundColor = '#bbb';
    }
  }
}

interface Window {
  game: App.Main;
}

window.onload = () => {
  window.game =  new App.Main();
  window.game.start();
};