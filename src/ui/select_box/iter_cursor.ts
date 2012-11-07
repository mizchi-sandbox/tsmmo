module App.UI {
  export class IterCursor extends enchant.Model {
    idx: number;
    private defaults = {
      idx: 0
    };

    constructor(public items: MenuItem[]){
      super({idx: 0});
    }

    public next() {
      this.idx = this.idx + 1;
      if(this.items.length === this.idx)
        this.idx = 0;
    }

    public prev() {
      this.idx = this.idx - 1;
      if(this.idx < 0)
        this.idx = this.items.length - 1;
    }

    public getItem(): MenuItem {
      return this.items[this.idx];
    }
  }
}