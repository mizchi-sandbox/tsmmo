///<reference path='types/underscore.d.ts'/>
///<reference path='types/backbone.d.ts'/>
///<reference path='types/enchant.d.ts'/>
///<reference path='mylib.ts'/>
///<reference path='ui/pane/pane.ts'/>
///<reference path='ui/input_manager.ts'/>
///<reference path='ui/menu.ts'/>
///<reference path='ui/pane/main/main_pane.ts'/>
///<reference path='ui/pane/sub/sub_pane.ts'/>
///<reference path='ui/cursor.ts'/>

declare var _ : underscore;
declare var enchant : enchant;

module App {
  export class Game extends enchant.Game {
    public static instance: Game;
    menu: UI.Menu;
    constructor(){
      super()
      Game.instance = this;
      this.width = 400;
      this.height = 300;
      this.rootScene.backgroundColor = '#bbb  ';

      this.fps = 24;
      this.preload('images/chara1.png');

      this.onload = () => {
        this.menu = new UI.Menu();
        this.rootScene.addChild(this.menu);
      };
    }
  }
}

interface Window {
  game: App.Game;
}

window.onload = () => {
  window.game =  new App.Game();
  window.game.start();
};