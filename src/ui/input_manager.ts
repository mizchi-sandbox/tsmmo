module App.UI {
  export class InputManager{
    private INITIAL_WAIT: number = 5;
    private REPEAT_WAIT : number = 3;
    private cnt: number;
    public isReady: bool;

    constructor() {
      this.cnt = 0;
    }
    public ready(): bool {
      var pushed = this.isAnyButtonPushed();
      // ボタンを押していない
      if(!pushed){
        this.cnt = 0;
        return false;
      }
      this.cnt++;
      if(this.cnt <= this.INITIAL_WAIT){
        if(this.cnt == 1) return true;
        if(this.cnt <= this.INITIAL_WAIT) return false;
      }
      return (this.cnt - this.INITIAL_WAIT) % this.REPEAT_WAIT === 1;
    }

    private isAnyButtonPushed(): bool{
      return _.any(_.map(game.input, (i) => i));
    }
  }

}