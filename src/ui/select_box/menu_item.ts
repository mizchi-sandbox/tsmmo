module App.UI {
  export class MenuItem extends Window {
    public onClick: Function;
    private onClick: Function;

    constructor(html: string) {
      super(0, 0, 50, 20);
      this.html = html;

      this.view.delegateEvents({
        'click': () => this.onClick();
      });
    }

    setPosition(n: number): void{
      this.x = 15;
      this.y = n * 20;
      this.z = 10;
    }

    setClickListener(f): void{
      this.onClick = f;
    }

    fire(): void {
      this.onClick();
    }
  }
}