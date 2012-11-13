///<reference path='../types/underscore.d.ts'/>
///<reference path='../types/node.d.ts'/>
var _:underscore = require('underscore');

class Utils{
  // 標準偏差
  public static normRand() {
    var a = 1 - Math.random();
    var b = 1 - Math.random();
    var c = Math.sqrt(-2 * Math.log(a));
    if(0.5 - Math.random() > 0) {
      return c * Math.sin(Math.PI * 2 * b) * 1;
    }else{
      return c * Math.cos(Math.PI * 2 * b) * 1;
    }
  };
  public static rand(ave, s) {
    return ave + normRand() * s;
  };

  public static randX(ave, rate) {
    return ave + normRand() * ave * rate;
  };
}

class Monster {
  atk: number;
  def: number;
  hp: number;
  max_hp: number;
  lv: number;

  constructor(lv){
    this.lv = lv;
    this.hp = 30;
    this.max_hp = this.hp;

    this.atk = 6;
    this.def = 2;
  }
}

var players : Monster[] = [];
var monsters: Monster[] = [];

var mons1 = new Monster(1);
var mons2 = new Monster(1);
players = players.concat([mons1, mons2]);

var mons3 = new Monster(1);
monsters = monsters.concat([mons3]);

while(1){
  mons1.hp -= Utils.randX(mons2.atk, 0.3);
  mons2.hp -= Utils.randX(mons1.atk, 0.3);
  console.log(mons1.hp, mons2.hp)

  if(_.all(_.map(players, (p) => (p.hp < 0))){
    console.log('mons2', 'win');
    break;
  }

  if(_.all(_.map(monsters, (m) => m.hp < 0))){
    console.log('mons1', 'win');
    break;
  }

}
