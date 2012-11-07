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
            var game = App.game;
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
            function Pane(parent, x, y, width, height) {
                        _super.call(this);
                this.parent = parent;
                this.width = width;
                this.height = height;
                this.debug = false;
                this.right = null;
                this.left = null;
                this.upper = null;
                this.bottom = null;
                this.Pane = [];
                this.x = x;
                this.y = y;
                if(this.parent instanceof App.Scene.Base) {
                    this.width = this.parent.width;
                    this.height = this.parent.height;
                }
                this.window = new UI.Window(0, 0, this.width, this.height);
                this.addChild(this.window);
            }
            Pane.prototype.splitVerticaly = function (ratio) {
                var rest = 1 - ratio;
                var left = new Pane(this, this.x, this.y, this.width * ratio, this.height);
                var right = new Pane(this, this.x + left.width, this.y, this.width * rest, this.height);
                this.Pane.push(left);
                this.Pane.push(right);
                return this.Pane;
            };
            Pane.prototype.splitHorizontaly = function (ratio) {
                var rest = 1 - ratio;
                var upper = new Pane(this, this.x, this.y, this.width, this.height * ratio);
                var bottom = new Pane(this, this.x, this.y + upper.height, this.width, this.height * rest);
                this.Pane.push(upper);
                this.Pane.push(bottom);
                return this.Pane;
            };
            return Pane;
        })(enchant.Group);
        UI.Pane = Pane;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var Window = (function (_super) {
            __extends(Window, _super);
            function Window(x, y, width, height) {
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
            return Window;
        })(enchant.HTMLObject);
        UI.Window = Window;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var InputManager = (function () {
            function InputManager() {
                this.INITIAL_WAIT = 5;
                this.REPEAT_WAIT = 3;
                this.cnt = 0;
            }
            InputManager.prototype.ready = function () {
                var pushed = this.isAnyButtonPushed();
                if(!pushed) {
                    this.cnt = 0;
                    return false;
                }
                this.cnt++;
                if(this.cnt <= this.INITIAL_WAIT) {
                    if(this.cnt == 1) {
                        return true;
                    }
                    if(this.cnt <= this.INITIAL_WAIT) {
                        return false;
                    }
                }
                return (this.cnt - this.INITIAL_WAIT) % this.REPEAT_WAIT === 1;
            };
            InputManager.prototype.isAnyButtonPushed = function () {
                return _.any(_.map(App.game.input, function (i) {
                    return i;
                }));
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
        var MenuItem = (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem(html) {
                var _this = this;
                        _super.call(this, 0, 0, 50, 20);
                this.html = html;
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
            MenuItem.prototype.setClickListener = function (f) {
                this.onClick = f;
            };
            MenuItem.prototype.fire = function () {
                this.onClick();
            };
            return MenuItem;
        })(UI.Window);
        UI.MenuItem = MenuItem;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
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
            IterCursor.prototype.getItem = function () {
                return this.items[this.idx];
            };
            return IterCursor;
        })(enchant.Model);
        UI.IterCursor = IterCursor;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (UI) {
        var SelectBox = (function (_super) {
            __extends(SelectBox, _super);
            function SelectBox() {
                var _this = this;
                        _super.call(this, 0, 0, 50, 200);
                this.items = [];
                this.im = new UI.InputManager();
                this.z = 0;
                this.setup();
                this.iterCursor = new UI.IterCursor(this.items);
                this.iterCursor.on('change', function () {
                    return _this.onChangeCursor();
                });
                this.onChangeCursor();
                this.css({
                    'background-color': 'wheat'
                });
                this.on(App.Event.ENTER_FRAME, function () {
                    return _this.update();
                });
                this.locateItems();
            }
            SelectBox.prototype.setup = function () {
            };
            SelectBox.prototype.locateItems = function () {
                _.each(this.items, function (item, n) {
                    item.x = 15;
                    item.y = n * 20;
                    item.z = 10;
                });
            };
            SelectBox.prototype.update = function () {
                if(this.im.ready()) {
                    if(App.game.input.up) {
                        this.iterCursor.prev();
                    } else {
                        if(App.game.input.down) {
                            this.iterCursor.next();
                        } else {
                            if(App.game.input.a) {
                                this.iterCursor.getItem().fire();
                            }
                        }
                    }
                }
            };
            SelectBox.prototype.addMenuItem = function (item) {
                this.items.push(item);
                this.parent.addChild(item);
            };
            SelectBox.prototype.onChangeCursor = function () {
                var _this = this;
                _.each(this.items, function (item, index) {
                    var color = _.cond(index === _this.iterCursor.idx, 'red', 'black');
                    item.css({
                        color: color
                    });
                });
            };
            return SelectBox;
        })(UI.Window);
        UI.SelectBox = SelectBox;        
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
            }
            return Menu;
        })(enchant.Group);
        UI.Menu = Menu;        
    })(App.UI || (App.UI = {}));
    var UI = App.UI;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
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
        Scene.MainPane = MainPane;        
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
        })(App.UI.Window);
        Scene.MainWindow = MainWindow;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
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
        Scene.SubPane = SubPane;        
        var SubWindow = (function (_super) {
            __extends(SubWindow, _super);
            function SubWindow(parent) {
                this.parent = parent;
                        _super.call(this);
            }
            SubWindow.prototype.setup = function () {
                var item1 = new App.UI.MenuItem("A");
                item1.setClickListener(function () {
                    return console.log("on A");
                });
                this.addMenuItem(item1);
                var item2 = new App.UI.MenuItem("B");
                item2.setClickListener(function () {
                    return console.log("on B");
                });
                this.addMenuItem(item2);
            };
            return SubWindow;
        })(App.UI.SelectBox);
        Scene.SubWindow = SubWindow;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

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
                var input = App.game.input;
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
    (function (Scene) {
        var Base = (function (_super) {
            __extends(Base, _super);
            function Base() {
                _super.apply(this, arguments);

            }
            return Base;
        })(enchant.Scene);
        Scene.Base = Base;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
        var Opening = (function (_super) {
            __extends(Opening, _super);
            function Opening() {
                        _super.call(this);
                var label = new enchant.Label();
                label.x = App.game.width / 2;
                label.y = App.game.height / 2;
                label.text = "Opening";
                this.addChild(label);
                this.on(App.Event.A_BUTTON_DOWN, function () {
                    return App.game.switchScene('field');
                });
            }
            return Opening;
        })(Scene.Base);
        Scene.Opening = Opening;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                        _super.call(this);
                this.on(App.Event.ENTER_FRAME, function () {
                });
                this.on(App.Event.B_BUTTON_DOWN, function () {
                    App.game.switchScene('field');
                });
                var subPane = new Scene.SubPane(this);
                var mainPane = new Scene.MainPane(this);

                this.addChild(mainPane);
                this.addChild(subPane);
            }
            return Menu;
        })(Scene.Base);
        Scene.Menu = Menu;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
        var Field = (function (_super) {
            __extends(Field, _super);
            function Field() {
                        _super.call(this);
                this.cursor = new App.UI.Cursor();
                this.addChild(this.cursor);
                this.on("enterframe", function () {
                    console.log("field");
                });
                this.on(App.Event.A_BUTTON_DOWN, function () {
                    App.game.switchScene('battle');
                });
                this.on(App.Event.B_BUTTON_DOWN, function () {
                    App.game.switchScene('menu');
                });
            }
            return Field;
        })(Scene.Base);
        Scene.Field = Field;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
        var Battle = (function (_super) {
            __extends(Battle, _super);
            function Battle() {
                        _super.call(this);
                var rootPane = new App.UI.Pane(null, 0, 0, App.game.width, App.game.height);
                var panes = rootPane.splitVerticaly(0.2);
                var left = panes[0];
                var right = panes[1];
                this.addChild(left);
                left.window.css({
                    'background-color': 'red'
                });
                var right_panes = right.splitHorizontaly(0.8);
                var right_upper = right_panes[0];
                var right_bottom = right_panes[1];
                right_upper.window.css({
                    'background-color': 'green'
                });
                right_bottom.window.css({
                    'background-color': 'blue'
                });
                this.addChild(right_upper);
                this.addChild(right_bottom);
                this.on("enterframe", function () {
                    console.log("battle");
                });
            }
            return Battle;
        })(Scene.Base);
        Scene.Battle = Battle;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    (function (Scene) {
        var Manager = (function () {
            function Manager(game) {
                this.game = game;
                this.menu = new Scene.Menu();
                this.opening = new Scene.Opening();
                this.field = new Scene.Field();
                this.battle = new Scene.Battle();
            }
            Manager.START_SCENE = 'opening';
            Manager.prototype.switchScene = function (scene_name) {
                App.game.replaceScene(this[scene_name]);
            };
            Manager.prototype.start = function () {
                App.game.pushScene(this.opening);
            };
            return Manager;
        })();
        Scene.Manager = Manager;        
    })(App.Scene || (App.Scene = {}));
    var Scene = App.Scene;

})(App || (App = {}));

var App;
(function (App) {
    App.Event = enchant.Event;
    App.game;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = this;
                _super.call(this);
            App.game = this;
            this.setup();
            this.onload = function () {
                _this.scene_manager = new App.Scene.Manager(_this);
                _this.scene_manager.start();
            };
            var im = new App.UI.InputManager();
            this.on(App.Event.ENTER_FRAME, function () {
                var isReady = im.ready();
            });
        }
        Main.prototype.switchScene = function (scene_name) {
            this.scene_manager.switchScene(scene_name);
        };
        Main.prototype.setup = function () {
            this.keybind('Z'.charCodeAt(0), "a");
            this.keybind('X'.charCodeAt(0), 'b');
            this.width = 400;
            this.height = 300;
            this.fps = 24;
            this.preload('images/chara1.png');
            this.rootScene.backgroundColor = '#bbb';
        };
        return Main;
    })(enchant.Game);
    App.Main = Main;    
})(App || (App = {}));

window.onload = function () {
    window.game = new App.Main();
    window.game.start();
};
