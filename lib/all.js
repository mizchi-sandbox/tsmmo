var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
_.mixin({
    'cond': function (tf, a, b) {
        if(tf) {
            return a;
        } else {
            return b;
        }
    }
});
var enchant;
(function (enchant) {
    var Canvas = (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            var game = App.Game.instance;
                _super.call(this, game.width, game.height);
            this.surface = new enchant.Surface(game.width, game.height);
        }
        return Canvas;
    })(enchant.Sprite);
    enchant.Canvas = Canvas;    
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model(props) {
            var _this = this;
                _super.call(this, props);
            _.each(this.attributes, function (val, key) {
                Object.defineProperty(_this, key, {
                    get: function () {
                        return _this.get(key);
                    },
                    set: function (val) {
                        return _this.set(key, val);
                    }
                });
            });
        }
        return Model;
    })(Backbone.Model);
    enchant.Model = Model;    
    var HTMLObject = (function (_super) {
        __extends(HTMLObject, _super);
        function HTMLObject() {
                _super.call(this);
            this.view = new Backbone.View();
            this.view.setElement(this._element);
            this.html = '';
        }
        HTMLObject.prototype.show = function () {
            this.css({
                visibility: 'visible'
            });
        };
        HTMLObject.prototype.hide = function () {
            this.css({
                visibility: 'hidden'
            });
        };
        Object.defineProperty(HTMLObject.prototype, "html", {
            get: function () {
                return this.view.$el.html();
            },
            set: function (text) {
                this.view.$el.html(text);
            },
            enumerable: true,
            configurable: true
        });
        HTMLObject.prototype.css = function (props) {
            this.view.$el.css(props);
        };
        Object.defineProperty(HTMLObject.prototype, "z", {
            get: function () {
                return Number(this._element.style.zIndex);
            },
            set: function (z) {
                this._element.style.zIndex = z;
            },
            enumerable: true,
            configurable: true
        });
        HTMLObject.prototype.setClassName = function (name) {
            this.view.$el.className = name;
        };
        return HTMLObject;
    })(enchant.Label);
    enchant.HTMLObject = HTMLObject;    
})(enchant || (enchant = {}));

var App;
(function (App) {
    (function (UI) {
        var Pane = (function (_super) {
            __extends(Pane, _super);
            function Pane(x, y, width, height) {
                        _super.call(this);
                this.debug = false;
                if(this.debug) {
                    this.css({
                        border: '1px solid black'
                    });
                }
                this.width = width;
                this.height = height;
                this.x = x;
                this.y = y;
            }
            return Pane;
        })(enchant.HTMLObject);
        UI.Pane = Pane;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var InputManager = (function () {
            function InputManager() {
                this.isListening = false;
                this.hasContext = false;
                this.initialWait = 18;
                this.repeatWait = 1;
                this.cnt = 0;
                this.lastState = false;
                this.input = game.input;
            }
            InputManager.prototype.onPressed = function () {
                return _.any(_.map(game.input, function (i) {
                    return i;
                }));
            };
            InputManager.prototype.isWaiting = function () {
                this.cnt++;
                var isListening = _.any(_.map(game.input, function (i) {
                    return i;
                }));
                var pressed = this.onPressed();
                if(!pressed) {
                    this.lastState = false;
                    return;
                }
                var result = this.cnt > _.cond(this.lastState !== pressed, this.initialWait, this.repeatWait);
                console.log(result, this.lastState !== pressed);
                this.lastState = result;
                if(result) {
                    this.cnt = 0;
                }
                return result;
            };
            return InputManager;
        })();
        UI.InputManager = InputManager;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                        _super.call(this);
                this.x = 0;
                this.y = 0;
                var subPane = new UI.SubPane(this);
                var mainPane = new UI.MainPane(this);
                var cursor = new App.UI.Cursor();

                this.addChild(mainPane);
                this.addChild(subPane);
                this.addChild(cursor);
                subPane.window.update();
            }
            return Menu;
        })(enchant.Group);
        UI.Menu = Menu;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var MainPane = (function (_super) {
            __extends(MainPane, _super);
            function MainPane(parent) {
                        _super.call(this);
                this.parent = parent;
                var main = new MainWindow(parent);
                this.addChild(main);
            }
            return MainPane;
        })(enchant.Group);
        UI.MainPane = MainPane;        
        var MainWindow = (function (_super) {
            __extends(MainWindow, _super);
            function MainWindow(parent) {
                        _super.call(this);
                this.parent = parent;
                this.cursor_idx = 0;
                this.WIDTH = 200;
                this.HEIGHT = 200;
                var padding = 5;
                var width = this.WIDTH - padding * 2;
                this.height = this.HEIGHT - padding * 2;
                this.x = 50 + padding;
                this.y = 0 + padding;
                this.css({
                    'background-color': 'grey'
                });
            }
            return MainWindow;
        })(UI.Pane);
        UI.MainWindow = MainWindow;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var MenuItem = (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem(html, index) {
                var _this = this;
                this.index = index;
                        _super.call(this, 0, 0, 50, 20);
                this.html = html;
                this.onClick = function () {
                };
                this.view.delegateEvents({
                    'click': function () {
                        return _this.onClick();
                    }
                });
            }
            MenuItem.prototype.setPosition = function (n) {
                this.x = 15;
                this.y = n * 20;
                this.z = 10;
            };
            return MenuItem;
        })(UI.Pane);
        UI.MenuItem = MenuItem;        
        var IterCursor = (function (_super) {
            __extends(IterCursor, _super);
            function IterCursor(items) {
                        _super.call(this, {
            idx: 0
        });
                this.items = items;
                this.defaults = {
                    idx: 0
                };
            }
            IterCursor.prototype.next = function () {
                this.idx = this.idx + 1;
                if(this.items.length === this.idx) {
                    this.idx = 0;
                }
            };
            IterCursor.prototype.prev = function () {
                this.idx = this.idx - 1;
                if(this.idx < 0) {
                    this.idx = this.items.length - 1;
                }
            };
            return IterCursor;
        })(enchant.Model);
        UI.IterCursor = IterCursor;        
        var SubWindow = (function (_super) {
            __extends(SubWindow, _super);
            function SubWindow(parent) {
                var _this = this;
                        _super.call(this, 0, 0, 50, 200);
                this.parent = parent;
                this.createMenuItems(3);
                this.z = 0;
                this.css({
                    'background-color': 'wheat'
                });
                this.iterCursor = new IterCursor(this.items);
                this.iterCursor.on('change', function () {
                    return _this.update();
                });
                var manager = new UI.InputManager();
                this.on(enchant.Event.ENTER_FRAME, function () {
                    if(!manager.isWaiting()) {
                        if(game.input.up) {
                            _this.iterCursor.prev();
                        }
                        if(game.input.down) {
                            _this.iterCursor.next();
                        }
                    }
                });
            }
            SubWindow.prototype.createMenuItems = function (n) {
                var _this = this;
                this.items = _.map(_.range(n), function (i) {
                    var item = new MenuItem("item", i);
                    item.setPosition(i);
                    _this.parent.addChild(item);
                    return item;
                });
            };
            SubWindow.prototype.update = function () {
                var _this = this;
                _.each(this.items, function (item, index) {
                    item.css({
                        color: _.cond(index === _this.iterCursor.idx, 'red', 'black')
                    });
                });
            };
            return SubWindow;
        })(UI.Pane);
        UI.SubWindow = SubWindow;        
        var SubPane = (function (_super) {
            __extends(SubPane, _super);
            function SubPane(parent) {
                        _super.call(this);
                this.parent = parent;
                this.window = new SubWindow(parent);
                this.addChild(this.window);
            }
            return SubPane;
        })(enchant.Group);
        UI.SubPane = SubPane;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var Cursor = (function (_super) {
            __extends(Cursor, _super);
            function Cursor() {
                        _super.call(this);
                this.x = 8;
                this.y = 8;
                this.text = '○';
                this.on('enterframe', this.update);
            }
            Cursor.prototype.update = function () {
                var input = App.Game.instance.input;
                if(input.right) {
                    this.x += 2;
                }
                if(input.left) {
                    this.x -= 2;
                }
                if(input.up) {
                    this.y -= 2;
                }
                if(input.down) {
                    this.y += 2;
                }
            };
            return Cursor;
        })(enchant.Label);
        UI.Cursor = Cursor;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
                _super.call(this);
            Game.instance = this;
            this.width = 400;
            this.height = 300;
            this.rootScene.backgroundColor = '#bbb  ';
            this.fps = 24;
            this.preload('images/chara1.png');
            this.onload = function () {
                _this.menu = new App.UI.Menu();
                _this.rootScene.addChild(_this.menu);
            };
        }
        Game.instance = null;
        return Game;
    })(enchant.Game);
    App.Game = Game;    
})(App || (App = {}));

window.onload = function () {
    window.game = new App.Game();
    window.game.start();
};
