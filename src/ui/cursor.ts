module App.UI {
  export class Cursor extends enchant.Label {
    constructor(){
      super();
      this.x = 8;
      this.y = 8;
      this.text = '○';
      this.on('enterframe', this.update);
    }

    update(): void {
      var input = Game.instance.input
      if (input.right) this.x += 2;
      if (input.left)  this.x -= 2;
      if (input.up)    this.y -= 2;
      if (input.down)  this.y += 2;
    }
  }
}
