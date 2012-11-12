module App.Scene {
  export class Base extends enchant.Scene {
    public back(){
      game.popScene(this);
    }
  }

}