module App.Scene {
  export class Manager extends enchant.Model{
    public static START_SCENE = 'opening';

    menu: Menu;
    opening: Opening;
    field: Field;
    battle: Battle;
    context: string;
    currentScene: enchant.Scene;

    private defaults = {
      context: 'opening'
    };

    constructor(public game){
      super();
      this.menu = new Menu;
      this.opening = new Opening;
      this.field = new Field;
      this.battle = new Battle;
      this.on('change:context', (model:Manager) =>{
        this.switchScene(model.get('context'));
      });
    }

    public switchScene(scene_name: string){
      this.currentScene.dispatchEvent('leave');
      var next = this[scene_name];
      game.replaceScene(next);
      this.currentScene = next;
      this.currentScene.dispatchEvent('enter');
    }

    public start() {
      var next = this.opening;
      game.pushScene(next);
      this.currentScene = next;
      this.currentScene.dispatchEvent('enter');
    }
  }
}