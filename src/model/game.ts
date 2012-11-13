module X {
  export var ev: Main;
  export var player: Player;
  export var monsters: Monsters;

  export class Entity extends enchant.Model {
    public x: number;
    public y: number;

    defaults(){
      return {
        x: 0,
        y: 0
      };
    }

    constructor(props?){
      super(props);
      ev.on("update", () => this.update())
    }
    update(){}

    public moveBy(x, y){
      this.x = this.x + x;
      this.y = this.y + y;
    }
    public moveTo(x, y){
      this.x = x;
      this.y = y;
    }

  }

  export class Player extends Entity {
    input: Input;
    constructor(){
      super();
      this.input = App.game.input;
    }
    update(){
      var game = App.game;
      var dx = 0, dy = 0;
      if (this.input.right) dx = 2;
      if (this.input.left)  dx = -2;
      if (this.input.up)    dy = -2;
      if (this.input.down)  dy = 2;
      this.moveBy(dx, dy);
    }
  }

  export class Monster extends Entity {
    constructor(){
      super();
    }
  }

  export class Monsters extends Backbone.Collection{
    model: Monster;
    constructor(){
      super();
      ev.on("update", () => {
        if(this.length < 10) this.spawn();
        if(Math.random() < 0.1){
          console.log('remove');
          this.remove( this.models[~~(Math.random()*this.length)] );
        }
      });
    }

    private spawn(){
      var monster = new Monster();
      monster.x = Math.random()*100;
      monster.y = Math.random()*100;
      this.add(monster);
    }
  }

  export class Main extends enchant.Model{
    constructor(){
      super({cnt: 0});
      X.ev = this;
      //this.player = new Player();
      X.player = new Player();
      X.monsters = new Monsters();
    }

    private update(){
      this.trigger('update');
    }

    public start(){
      var f = () =>{
        setTimeout(()=>{
          this.update();
          f();
        }, 60)
      };
      f();
    }
  }
}


