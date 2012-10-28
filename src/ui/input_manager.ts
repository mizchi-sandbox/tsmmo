module App.UI {
  export class InputManager{
    public isListening: bool = false;
    public hasContext: bool = false;

    initialWait: number = 18;
    repeatWait: number = 1;
    private input: any;
    private cnt: number = 0;
    private lastState: bool = false;

    constructor(){
      this.input = game.input;
    }

    onPressed(): bool {
      return _.any(
        _.map(
          game.input, (i) => i
        )
      );
    }

    isWaiting(): bool {
      this.cnt++;
      var isListening = _.any(
        _.map(
          game.input, (i) => i
        )
      );
      var pressed = this.onPressed();
      if(!pressed){
        this.lastState = false;
        return;
      }

      var result = this.cnt > _.cond(
        this.lastState !== pressed,
        this.initialWait,
        this.repeatWait
      );
      console.log(result, this.lastState !== pressed)
      this.lastState = result;
      if(result) this.cnt = 0;
      return result;
    }
  }
}