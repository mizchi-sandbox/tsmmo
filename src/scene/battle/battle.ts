module App.Scene {
  export class Battle extends Base {
    constructor(){
      super();
      var rootPane = new UI.Pane(null, 0, 0, game.width, game.height);
      var panes:UI.Pane[] = rootPane.splitVerticaly(0.2);
      var left:UI.Pane = panes[0];
      var right:UI.Pane = panes[1];

      this.addChild(left);
      left.window.css({'background-color': 'red'});

      var right_panes = right.splitHorizontaly(0.8);
      var right_upper = right_panes[0];
      var right_bottom = right_panes[1];

      right_upper.window.css({'background-color': 'green'});
      right_bottom.window.css({'background-color': 'blue'});

      this.addChild(right_upper);
      this.addChild(right_bottom);

      this.on("enterframe", () => {
        console.log("battle");
      });
    }
  }
}