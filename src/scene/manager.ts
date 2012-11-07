module App.Scene {
  export class Manager {
    public static START_SCENE = 'opening';

    menu: Menu;
    opening: Opening;
    field: Field;
    battle: Battle;

    constructor(public game){
      this.menu = new Menu;
      this.opening = new Opening;
      this.field = new Field;
      this.battle = new Battle;
    }

    public switchScene(scene_name: string){
      game.replaceScene(this[scene_name]);
    }

    public start() {
      game.pushScene(this.opening);
    }
  }
}