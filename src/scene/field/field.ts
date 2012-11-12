module App.Scene {

  export class Entity extends enchant.Group {
    constructor(){
      super();
    }
  }

  export class Player extends Entity {
    model: X.Player;
    constructor(){
      super();
      this.model = X.ev.player;
      var label = new enchant.Label('○');
      this.addChild(label);

      this.model.on('change:x change:y', (p:X.Player) =>{
        this.x = p.x;
        this.y = p.y;
      });
    }
  }

  export class Monster extends Entity {
    model: X.Monster;
    constructor(monster){
      super();
      this.model = monster;
      var label = new enchant.Label('●');
      this.addChild(label);
      this.model.on('change:x change:y', () => this.update());
      this.update();
    }

    update(){
      this.x = this.model.x;
      this.y = this.model.y;
    }

  }

  export class Collection{
    constructor(){
    }
  }

  export class Monsters extends Collection {
    collection: Backbone.Collection;
    constructor(public field){
      super();
      this.collection = X.ev.monsters;

      this.collection.on('add', (model) => {
        var monster = new Monster(model);
        this.field.addChild(monster);
      });

      this.collection.on('remove', (model) => {
        var node = _.find(this.field.childNodes, (i) => i.model === model);
        this.field.removeChild(node);
      });
    }
  }

  export class Field extends Base {
    menu: Menu;
    battle: Battle;
    monsters: Monsters;

    constructor(){
      super();
      this.menu = new Menu;
      this.battle = new Battle;

      this.monsters = new Monsters(this);

      var player = new Player;
      this.addChild(player);

      this.on("enter", () => console.log('load field'))
      this.on("leave", () => console.log('leave field'))

      this.on("enterframe", () => {
      });

      this.on(Event.A_BUTTON_DOWN, () => {
        game.pushScene(this.battle);
      });

      this.on(Event.B_BUTTON_DOWN, () => {
        game.pushScene(this.menu);
      });

    }
  }
}