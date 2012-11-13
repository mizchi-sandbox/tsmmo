var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var enchant;
(function (enchant) {
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
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(props) {
                _super.call(this, props);
        }
        return Collection;
    })(Backbone.Collection);
    enchant.Collection = Collection;    
    var ViewModel = (function (_super) {
        __extends(ViewModel, _super);
        function ViewModel(model) {
                _super.call(this);
            this.model = model;
        }
        return ViewModel;
    })(enchant.Group);
    enchant.ViewModel = ViewModel;    
    var HTMLObject = (function (_super) {
        __extends(HTMLObject, _super);
        function HTMLObject(html) {
                _super.call(this);
            this.view = new Backbone.View();
            this.view.setElement(this._element);
            this.html = html || '';
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

_.mixin({
    'cond': function (tf, a, b) {
        if(tf) {
            return a;
        } else {
            return b;
        }
    }
});
var X;
(function (X) {
    X.ev;
    X.player;
    X.monsters;
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(props) {
            var _this = this;
                _super.call(this, props);
            X.ev.on("update", function () {
                return _this.update();
            });
        }
        Entity.prototype.defaults = function () {
            return {
                x: 0,
                y: 0
            };
        };
        Entity.prototype.update = function () {
        };
        Entity.prototype.moveBy = function (x, y) {
            this.x = this.x + x;
            this.y = this.y + y;
        };
        Entity.prototype.moveTo = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Entity;
    })(enchant.Model);
    X.Entity = Entity;    
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
                _super.call(this);
            this.input = App.game.input;
        }
        Player.prototype.update = function () {
            var game = App.game;
            var dx = 0;
            var dy = 0;

            if(this.input.right) {
                dx = 2;
            }
            if(this.input.left) {
                dx = -2;
            }
            if(this.input.up) {
                dy = -2;
            }
            if(this.input.down) {
                dy = 2;
            }
            this.moveBy(dx, dy);
        };
        return Player;
    })(Entity);
    X.Player = Player;    
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster() {
                _super.call(this);
        }
        return Monster;
    })(Entity);
    X.Monster = Monster;    
    var Monsters = (function (_super) {
        __extends(Monsters, _super);
        function Monsters() {
            var _this = this;
                _super.call(this);
            X.ev.on("update", function () {
                if(_this.length < 10) {
                    _this.spawn();
                }
                if(Math.random() < 0.1) {
                    console.log('remove');
                    _this.remove(_this.models[~~(Math.random() * _this.length)]);
                }
            });
        }
        Monsters.prototype.spawn = function () {
            var monster = new Monster();
            monster.x = Math.random() * 100;
            monster.y = Math.random() * 100;
            this.add(monster);
        };
        return Monsters;
    })(Backbone.Collection);
    X.Monsters = Monsters;    
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
                _super.call(this, {
        cnt: 0
    });
            X.ev = this;
            X.player = new Player();
            X.monsters = new Monsters();
        }
        Main.prototype.update = function () {
            this.trigger('update');
        };
        Main.prototype.start = function () {
            var _this = this;
            var f = function () {
                setTimeout(function () {
                    _this.update();
                    f();
                }, 60);
            };
            f();
        };
        return Main;
    })(enchant.Model);
    X.Main = Main;    
})(X || (X = {}));

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
            Pane.prototype.setWindow = function (win) {
                this.removeChild(this.window);
                this.window = win;
                this.addChild(this.window);
            };
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
                this.debug = true;
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
            InputManager.prototype.isAnyButtonPushed = function () {
                return _.any(_.map(App.game.input, function (i) {
                    return i;
                }));
            };
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
        var Cursor = (function (_super) {
            __extends(Cursor, _super);
            function Cursor() {
                        _super.call(this);
                this.x = 8;
                this.y = 8;
                this.text = '○';
                console.log;
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
            Base.prototype.back = function () {
                App.game.popScene(this);
            };
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
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                var _this = this;
                        _super.call(this);
                this.on(App.Event.ENTER_FRAME, function () {
                });
                this.on(App.Event.B_BUTTON_DOWN, function () {
                    _this.back();
                });
                var root = new App.UI.Pane(null, 0, 0, App.game.width, App.game.height);
                var panes = root.splitVerticaly(0.2);
                var subPane = panes[0];
                var mainPane = panes[1];
                subPane.setWindow(new SubWindow(this));
                this.addChild(subPane);
                this.addChild(mainPane);
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
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player() {
                var _this = this;
                        _super.call(this, X.player);
                var label = new enchant.Label('○');
                this.addChild(label);
                this.model.on('change:x change:y', function (p) {
                    _this.x = p.x;
                    _this.y = p.y;
                });
            }
            return Player;
        })(enchant.ViewModel);
        Scene.Player = Player;        
        var Monster = (function (_super) {
            __extends(Monster, _super);
            function Monster(model) {
                var _this = this;
                        _super.call(this, model);
                var label = new enchant.Label('●');
                this.addChild(label);
                this.model.on('change:x change:y', function (model) {
                    return _this.update();
                });
                this.update();
            }
            Monster.prototype.update = function () {
                this.x = this.model.x;
                this.y = this.model.y;
            };
            Monster.prototype.destroy = function () {
                this.model.off();
            };
            return Monster;
        })(enchant.ViewModel);
        Scene.Monster = Monster;        
        var Collection = (function () {
            function Collection() {
            }
            return Collection;
        })();
        Scene.Collection = Collection;        
        var Monsters = (function (_super) {
            __extends(Monsters, _super);
            function Monsters(field) {
                var _this = this;
                        _super.call(this);
                this.field = field;
                this.collection = X.monsters;
                this.collection.on('add', function (model) {
                    var monster = new Monster(model);
                    _this.field.addChild(monster);
                });
                this.collection.on('remove', function (model) {
                    model.off();
                    var node = _.find(_this.field.childNodes, function (i) {
                        return i.model === model;
                    });
                    _this.field.removeChild(node);
                });
            }
            return Monsters;
        })(Collection);
        Scene.Monsters = Monsters;        
        var Field = (function (_super) {
            __extends(Field, _super);
            function Field() {
                var _this = this;
                        _super.call(this);
                this.menu = new Scene.Menu();
                this.battle = new Scene.Battle();
                this.monsters = new Monsters(this);
                var player = new Player();
                this.addChild(player);
                this.on("enter", function () {
                    return console.log('load field');
                });
                this.on("leave", function () {
                    return console.log('leave field');
                });
                this.on("enterframe", function () {
                });
                this.on(App.Event.A_BUTTON_DOWN, function () {
                    App.game.pushScene(_this.battle);
                });
                this.on(App.Event.B_BUTTON_DOWN, function () {
                    App.game.pushScene(_this.menu);
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
        var Manager = (function (_super) {
            __extends(Manager, _super);
            function Manager(game) {
                var _this = this;
                        _super.call(this);
                this.game = game;
                this.defaults = {
                    context: 'opening'
                };
                this.menu = new Scene.Menu();
                this.opening = new Scene.Opening();
                this.field = new Scene.Field();
                this.battle = new Scene.Battle();
                this.on('change:context', function (model) {
                    _this.switchScene(model.get('context'));
                });
            }
            Manager.START_SCENE = 'opening';
            Manager.prototype.switchScene = function (scene_name) {
                this.currentScene.dispatchEvent('leave');
                var next = this[scene_name];
                App.game.replaceScene(next);
                this.currentScene = next;
                this.currentScene.dispatchEvent('enter');
            };
            Manager.prototype.start = function () {
                var next = this.opening;
                App.game.pushScene(next);
                this.currentScene = next;
                this.currentScene.dispatchEvent('enter');
            };
            return Manager;
        })(enchant.Model);
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
            var x = new X.Main();
            x.start();
        }
        Main.prototype.switchScene = function (scene_name) {
            this.scene_manager.set({
                context: scene_name
            });
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
