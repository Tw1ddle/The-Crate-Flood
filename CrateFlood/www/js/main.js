function assert(expression, msg) {
    if(!expression) {
        if(msg == null) {
            window.alert("Assertion failed.");
        } else {
            window.alert("Assertion failed: " + msg);
        }
    }
}
var Debug;
(function (Debug) {
    Debug.DRAW_SPRITEBOXES_ENABLED = false;
    Debug.GUI_ENABLED = true;
    var uniqueID = (function () {
        var id = 0;
        return function () {
            id++;
            return id.toString();
        };
    })();
    function getFolder(gui, tag) {
        if(tag != null) {
            return gui.addFolder(tag.concat(' (').concat(uniqueID().concat(')')));
        } else {
            return gui.addFolder('Item '.concat('(').concat(uniqueID().concat(')')));
        }
    }
    function addCamera(gui, camera, tag) {
        var folder = addItem(gui, camera, tag);
        folder.add(camera, 'frustumCulled').listen();
        return folder;
    }
    Debug.addCamera = addCamera;
    function addText(gui, textitem, tag) {
        var folder = addItem(gui, textitem, tag);
        return folder;
    }
    Debug.addText = addText;
    function addItem(gui, object, tag) {
        assert(Debug.GUI_ENABLED, "Debug addon called with debugging disabled");
        var folder = getFolder(gui, tag);
        folder.add(object.position, 'x', -1000.0, 1000.0, 0.1).listen();
        folder.add(object.position, 'y', -1000.0, 1000.0, 0.1).listen();
        folder.add(object.position, 'z', -1000.0, 1000.0, 0.1).listen();
        folder.add(object.rotation, 'x', 0.0, Math.PI * 2, 0.1).listen();
        folder.add(object.rotation, 'y', 0.0, Math.PI * 2, 0.1).listen();
        folder.add(object.rotation, 'z', 0.0, Math.PI * 2, 0.1).listen();
        folder.add(object.scale, 'x', 0.0, 10.0, 0.1).listen();
        folder.add(object.scale, 'y', 0.0, 10.0, 0.1).listen();
        folder.add(object.scale, 'z', 0.0, 10.0, 0.1).listen();
        folder.add(object, 'visible').listen();
        folder.add(object, 'id').listen();
        return folder;
    }
    Debug.addItem = addItem;
    function addItems(gui, objects, tag) {
        var folder = getFolder(gui, "Items");
        for(var i = 0; i < objects.length; i++) {
            addItem(folder, objects[i], tag);
        }
        return folder;
    }
    Debug.addItems = addItems;
    function addSceneInfo(gui, scene, tag) {
        var folder = getFolder(gui, tag);
        folder.add(scene.children, 'length').listen();
        return folder;
    }
    Debug.addSceneInfo = addSceneInfo;
    function addToScene(scene) {
    }
    Debug.addToScene = addToScene;
})(Debug || (Debug = {}));
var Debug;
(function (Debug) {
    Debug.TERMINAL_ENABLED = true;
    var Commands = {
        Help: {
            id: "help",
            description: "lists your options"
        },
        Context: {
            id: "context",
            description: "returns the current execution context"
        },
        Dump: {
            id: "dump",
            description: "dumps the named object"
        },
        Keys: {
            id: "keys",
            description: "dumps the keys of the named object"
        },
        Execute: {
            id: "run",
            description: "executes the named function"
        }
    };
    var CVars = {
        TogglePaused: "togglepaused",
        RendererInfo: "renderer"
    };
    var Namespaces = {
        Game: "main.game",
        Main: "main"
    };
    var currentContext = Namespaces.Game;
    var Terminal = (function () {
        function Terminal() {
            assert(Debug.TERMINAL_ENABLED, 'terminal initialized with terminal disabled');
            jQuery(document).ready(function ($) {
                $('#tilda').tilda(function (input, terminal) {
                    var args = input.split(" ");
                    var keyword = args[0];
                    var options = args.slice(1, args.length);
                    if(keyword == Commands.Help.id) {
                        terminal.echo("Remember - some methods are private/cannot be called");
                        terminal.echo("Commands: \n\n" + Utility.dumpObjectIndented(Commands, " ") + "\n");
                        terminal.echo("CVars: " + Utility.dumpObjectIndented(CVars, " ") + "\n");
                        terminal.echo("Contexts: " + Utility.dumpObjectIndented(Namespaces, " ") + "\n");
                    } else if(keyword == Commands.Context.id) {
                        if(options[0] != null) {
                            currentContext = options[0];
                            terminal.echo("Current context set to: " + currentContext);
                        } else {
                            terminal.echo("Current context: " + currentContext);
                        }
                    } else if(keyword == Commands.Execute.id) {
                        terminal.echo("Executing: " + options[0] + " in namespace: " + currentContext + " with params: " + options.slice(1, options.length));
                        Utility.executeFunctionByName(currentContext.concat(".").concat(options[0]), window, options.slice(1, options.length));
                    } else if(keyword == Commands.Dump.id) {
                        if(options[0] != null) {
                            terminal.echo("Attempting to dump: " + options[0]);
                            terminal.echo(Utility.dumpObjectIndented(eval(currentContext.concat("." + options[0]))));
                        } else {
                            terminal.echo("Dumping current context:");
                            terminal.echo(Utility.getPropertyValuePairs(eval(currentContext)));
                        }
                    } else if(keyword == CVars.RendererInfo) {
                        terminal.echo("Renderer: \n" + Utility.dumpObjectIndented(null) + "\n");
                    } else {
                        terminal.echo("Unrecognized keyword: " + "[" + keyword + "]");
                        terminal.echo("Arguments: \n" + Utility.dumpObjectIndented(options) + "\n");
                    }
                });
            });
        }
        Terminal.prototype.write = function (message) {
        };
        return Terminal;
    })();
    Debug.Terminal = Terminal;    
})(Debug || (Debug = {}));
var Random = (function () {
    function Random() { }
    Random.seed = 42;
    Random.initialized = false;
    Random.nextInt = function nextInt() {
        return this.generate();
    };
    Random.nextDouble = function nextDouble() {
        return (this.generate() / 2147483647);
    };
    Random.nextIntRange = function nextIntRange(min, max) {
        return Math.round(min + ((max - min) * this.nextDouble()));
    };
    Random.nextDoubleRange = function nextDoubleRange(min, max) {
        return min + ((max - min) * this.nextDouble());
    };
    Random.nextBoolean = function nextBoolean() {
        return (this.generate() % 2) === 0;
    };
    Random.setSeed = function setSeed(seed) {
        this.initialized = true;
        this.seed = seed;
    };
    Random.generate = function generate() {
        assert(this.initialized == true, 'Random number generator has not been seeded');
        return this.seed = (this.seed * 16807) % 2147483647;
    };
    return Random;
})();
var Assets;
(function (Assets) {
    var Preloader = (function () {
        function Preloader() { }
        return Preloader;
    })();
    Assets.Preloader = Preloader;    
    (function (Image) {
        Image.hill1 = 'assets/hill1.png';
        Image.hill2 = 'assets/hill2.png';
        Image.island1 = 'assets/island1.png';
        Image.island2 = 'assets/island2.png';
        Image.island3 = 'assets/island3.png';
        Image.island4 = 'assets/island4.png';
        Image.island5 = 'assets/island5.png';
        Image.moon = 'assets/moon.png';
        Image.raindrop = 'assets/raindrop.png';
        Image.cloud1 = 'assets/cloud1.png';
        Image.cloud2 = 'assets/cloud2.png';
        Image.cloud3 = 'assets/cloud3.png';
        Image.tree1 = 'assets/tree1.png';
        Image.tree2 = 'assets/tree2.png';
        Image.tree3 = 'assets/tree3.png';
        Image.ground = 'assets/ground.png';
        Image.bggradient = 'assets/bggradient.png';
        Image.stars = 'assets/stars.png';
        Image.crate = 'assets/crate.png';
    })(Assets.Image || (Assets.Image = {}));
    var Image = Assets.Image;
    (function (Sprite) {
        Sprite.water = 'assets/water.png';
        Sprite.player1 = 'assets/player1.png';
        Sprite.explosion = 'assets/explosion.png';
        Sprite.splash = 'assets/splash.png';
        Sprite.flag1 = 'assets/flag.png';
    })(Assets.Sprite || (Assets.Sprite = {}));
    var Sprite = Assets.Sprite;
    (function (Sound) {
        Sound.explosion = 'assets/sfx/47252__nthompson__rocketexpl.mp3';
        Sound.thunder = 'assets/sfx/2523__rhumphries__rbh-thunder-storm.mp3';
        Sound.rain = 'assets/sfx/7521__abinadimeza__rainfall.mp3';
        Sound.footstep_right = 'assets/sfx/9907__snoman__grass4_alt.mp3';
        Sound.footstep_left = 'assets/sfx/9907__snoman__grass4.mp3';
        Sound.crate_break = 'assets/sfx/66777__kevinkace__crate-break-1.mp3';
        Sound.water_splash = 'assets/sfx/20433__agfx__water-slosh-spashing-3.mp3';
    })(Assets.Sound || (Assets.Sound = {}));
    var Sound = Assets.Sound;
    var Music;
    (function (Music) {
        Music.music = 'assets/FloodsOfEvil.mp3';
    })(Music || (Music = {}));
})(Assets || (Assets = {}));
var Config;
(function (Config) {
    Config.GAME_WIDTH = 800;
    Config.GAME_HEIGHT = 500;
    Config.RENDER_WIDTH = 400;
    Config.RENDER_HEIGHT = 250;
})(Config || (Config = {}));
var Utility;
(function (Utility) {
    function isFunction(x) {
        return Object.prototype.toString.call(x) == '[object Function]';
    }
    Utility.isFunction = isFunction;
    function generateImage(width, height, fillStyle, alpha) {
        var canvas = document.createElement('canvas');
        assert(canvas, 'canvas image not generated');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        assert(context, '2d canvas context not found');
        context.fillStyle = fillStyle;
        context.globalAlpha = alpha;
        context.fillRect(0, 0, width, height);
        return canvas;
    }
    Utility.generateImage = generateImage;
    function modifyConsoleLogging(logic) {
    }
    Utility.modifyConsoleLogging = modifyConsoleLogging;
    function getKeys(object) {
        return Object.keys(object);
    }
    Utility.getKeys = getKeys;
    function getValues(object) {
        var values = new Array();
        for(var key in object) {
            values.push("[" + object[key] + "]");
        }
        return values;
    }
    Utility.getValues = getValues;
    function getPropertyValuePairs(object) {
        var pairs = new Array();
        for(var key in object) {
            pairs.push("\n\n" + key + "=" + object[key]);
        }
        return pairs;
    }
    Utility.getPropertyValuePairs = getPropertyValuePairs;
    function executeFunctionByName(functionName, context, params) {
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, params);
    }
    Utility.executeFunctionByName = executeFunctionByName;
    function dumpObjectIndented(obj, indent) {
        if (typeof indent === "undefined") { indent = " "; }
        var result = "";
        if(indent == null) {
            indent = "";
        }
        for(var property in obj) {
            var value = obj[property];
            if(typeof value == 'string') {
                value = "'" + value + "'";
            } else if(typeof value == 'object') {
                if(value instanceof Array) {
                    value = "[ " + value + " ]";
                } else {
                    var od = dumpObjectIndented(value, indent + "  ");
                    value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
                }
            }
            result += indent + "'" + property + "' : " + value + ",\n";
        }
        return result.replace(/,\n$/, "");
    }
    Utility.dumpObjectIndented = dumpObjectIndented;
})(Utility || (Utility = {}));
var BaseScene = (function () {
    function BaseScene(renderer) {
        this.renderer = renderer;
        this.cameraXYOffset = new THREE.Vector2(0, 0);
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, Config.RENDER_WIDTH, Config.RENDER_HEIGHT, 0, -1000, 1000);
        this.camera.position.set(0, 0, 200);
        this.lastCameraPosition = this.camera.position.clone();
        if(Debug.GUI_ENABLED) {
            this.debug = new dat.gui.GUI();
            Debug.addCamera(this.debug, this.camera, 'Camera');
            Debug.addSceneInfo(this.debug, this.scene, 'Scene');
        }
    }
    BaseScene.prototype.render = function (dt) {
        this.renderer.render(this.scene, this.camera);
    };
    BaseScene.prototype.update = function (dt) {
        this.cameraXYOffset = new THREE.Vector2(this.camera.position.x - this.lastCameraPosition.x, this.camera.position.y - this.lastCameraPosition.y);
        this.lastCameraPosition = this.camera.position.clone();
        for(var i = 0; i < this.scene.children.length; i++) {
            var object = this.scene.children[i];
            if(Utility.isFunction(object.update)) {
                object.update(dt, this.cameraXYOffset);
            }
        }
    };
    return BaseScene;
})();
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LoaderScene = (function (_super) {
    __extends(LoaderScene, _super);
    function LoaderScene(renderer) {
        _super.call(this, renderer);
    }
    LoaderScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    LoaderScene.prototype.update = function (dt) {
    };
    return LoaderScene;
})(BaseScene);
var StartScreenScene = (function (_super) {
    __extends(StartScreenScene, _super);
    function StartScreenScene(renderer) {
        _super.call(this, renderer);
    }
    StartScreenScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    StartScreenScene.prototype.update = function (dt) {
    };
    return StartScreenScene;
})(BaseScene);
var Layer;
(function (Layer) {
    Layer.back = -50;
    Layer.stars = -48;
    Layer.moon = -45;
    Layer.waterBackground = -20;
    Layer.hill2 = -18;
    Layer.hill1 = -14;
    Layer.treesBackground = -12;
    Layer.earthBackground = -10;
    Layer.middle = 0;
    Layer.treesForeground = 5;
    Layer.clouds = 7;
    Layer.rain = 10;
    Layer.crate = 13;
    Layer.player = 19;
    Layer.islandsForeground = 25;
    Layer.waterForeground = 35;
    Layer.lightning = 45;
    Layer.front = 50;
})(Layer || (Layer = {}));
var initColorSize = function () {
    this.initialize = function (emitter, particle) {
        particle.target.color().setHSV(0.3, 0.9, 0.4);
        particle.target.size(30);
    };
};
var Rain = (function (_super) {
    __extends(Rain, _super);
    function Rain(position) {
        _super.call(this);
        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = Layer.rain;
        this.counter = new SPARKS.SteadyCounter(50);
        this.emitter = new SPARKS.Emitter(this.counter);
        this.emitter.addInitializer(initColorSize);
        this.emitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(new THREE.Vector3(200, 100, Layer.rain))));
        this.emitter.addInitializer(new SPARKS.Lifetime(3, 5));
        this.emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 0.02, 0))));
        this.emitter.addAction(new SPARKS.Age());
        this.emitter.addAction(new SPARKS.Move());
        this.emitter.start();
    }
    Rain.prototype.onParticleCreated = function (particle) {
        console.info("particle created");
        particle.target.position = particle.position;
    };
    Rain.prototype.onParticleDeath = function (particle) {
    };
    Rain.prototype.initColorSize = function (emitter, particle) {
    };
    Rain.prototype.initializeParticle = function () {
    };
    return Rain;
})(THREE.Object3D);
var Animations;
(function (Animations) {
    Animations.none = {
        frames: [
            0
        ],
        times: [
            0
        ]
    };
})(Animations || (Animations = {}));
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(width, height, texture, position, scroll, tileLayout) {
        _super.call(this, new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({
    map: texture,
    overdraw: true
}));
        this.width = width;
        this.height = height;
        this.texture = texture;
        this.animationTimeAccumulator = 0;
        this.currentFrame = 0;
        this.velocity = new THREE.Vector2(0, 0);
        this.anims = new Array();
        ((this)).doubleSided = true;
        if(position != null) {
            this.position.set(position.x, position.y, position.z);
        } else {
            this.position = new THREE.Vector3(0, 0, 0);
        }
        if(tileLayout == null) {
            this.tileLayout = new THREE.Vector3(1, 1, 1);
        } else {
            this.tileLayout = tileLayout;
        }
        if(scroll == null) {
            this.scroll = new THREE.Vector2(0, 0);
        } else {
            this.scroll = scroll;
        }
        assert(texture != null, 'Sprite with null texture constructed');
    }
    Sprite.prototype.update = function (dt, scrollPoint) {
        if(this.anims.length != 0) {
            this.animationTimeAccumulator += dt;
            if(this.animationTimeAccumulator > this.anims[this.currentAnimation].times[this.currentFrame]) {
                console.info("setting tile");
                this.setTile();
            }
        }
        this.position.x += this.velocity.x * dt + (scrollPoint.x * this.scroll.x);
        this.position.y += this.velocity.y * dt + (scrollPoint.y * this.scroll.y);
    };
    Sprite.prototype.setTile = function () {
        this.animationTimeAccumulator = 0;
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeatVector2 = new THREE.Vector2(1 / this.tileLayout.x, 1 / this.tileLayout.y);
        this.currentFrame++;
        if(this.currentFrame == this.anims[this.currentAnimation].frames.length) {
            this.currentFrame = 0;
        }
        var currentColumn = this.anims[this.currentAnimation].frames[this.currentFrame] % this.tileLayout.x;
        var currentRow = Math.floor(this.anims[this.currentAnimation].frames[this.currentFrame] / this.tileLayout.x);
    };
    Sprite.prototype.setAnimation = function (id) {
        this.currentAnimation = id;
    };
    return Sprite;
})(THREE.Mesh);
var Animations;
(function (Animations) {
    Animations.walkleft = {
        frames: [
            0
        ],
        times: [
            0
        ]
    };
})(Animations || (Animations = {}));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position) {
        var texture = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);
        _super.call(this, 28, 28, texture, position, new THREE.Vector2(1, 1), new THREE.Vector3(4, 2, 8));
        this.anims.push({
            frames: [
                4, 
                5, 
                6, 
                7
            ],
            times: [
                2, 
                2, 
                2, 
                2
            ]
        });
        this.currentAnimation = 0;
    }
    Player.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
    };
    return Player;
})(Sprite);
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree(position, rotation, id, layer) {
        if(layer == null) {
            layer = Layer.treesForeground;
        }
        if(id == null) {
            id = Random.nextIntRange(0, 2);
        }
        if(rotation) {
            this.rotation = rotation;
        }
        assert(id <= 2 && id >= 0);
        var size = new THREE.Vector2();
        var texture;
        if(id == 0) {
            size = new THREE.Vector2(37, 32);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.tree1);
        }
        if(id == 1) {
            size = new THREE.Vector2(46, 43);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.tree2);
        }
        if(id == 2) {
            size = new THREE.Vector2(58, 59);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.tree3);
        }
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
    return Tree;
})(Sprite);
var Lightning = (function (_super) {
    __extends(Lightning, _super);
    function Lightning(position) {
        var texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#FFFFFF", 0.23));
        texture.needsUpdate = true;
        _super.call(this, Config.RENDER_WIDTH, Config.RENDER_HEIGHT, texture, new THREE.Vector3(position.x, position.y, Layer.lightning), new THREE.Vector2(1, 1));
        this.cumulativeTime = 0;
        this.flashDuration = 0.10;
        this.frequency = 4.00;
        this.visible = false;
        this.material.overdraw = false;
    }
    Lightning.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
        this.cumulativeTime += dt;
        if(this.cumulativeTime > (this.frequency + this.flashDuration)) {
            this.cumulativeTime = 0;
            this.visible = false;
        }
        if(this.cumulativeTime > this.frequency) {
            this.visible = true;
        }
    };
    return Lightning;
})(Sprite);
var Island = (function (_super) {
    __extends(Island, _super);
    function Island(position, rotation, id, layer) {
        if(layer == null) {
            layer = Layer.islandsForeground;
        }
        if(id == null) {
            id = Random.nextIntRange(0, 4);
        }
        if(rotation) {
            this.rotation = rotation;
        }
        assert(id <= 4 && id >= 0);
        var size = new THREE.Vector2();
        var texture;
        if(id == 0) {
            size = new THREE.Vector2(81, 26);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island1);
        }
        if(id == 1) {
            size = new THREE.Vector2(51, 20);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island2);
        }
        if(id == 2) {
            size = new THREE.Vector2(110, 30);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island3);
        }
        if(id == 3) {
            size = new THREE.Vector2(111, 35);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island4);
        }
        if(id == 4) {
            size = new THREE.Vector2(89, 35);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.island5);
        }
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
    return Island;
})(Sprite);
Math.clamp = function clamp(num, min, max) {
    return Math.max(min, Math.min(num, max));
};
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(position, rotation, id, layer) {
        if(layer == null) {
            layer = Layer.clouds;
        }
        if(id == null) {
            id = Random.nextIntRange(0, 2);
        }
        if(rotation) {
            this.rotation = rotation;
        }
        assert(id <= 2 && id >= 0);
        var size = new THREE.Vector2();
        var texture;
        if(id == 0) {
            size = new THREE.Vector2(107, 20);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud1);
        }
        if(id == 1) {
            size = new THREE.Vector2(61, 17);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud2);
        }
        if(id == 2) {
            size = new THREE.Vector2(110, 22);
            texture = THREE.ImageUtils.loadTexture(Assets.Image.cloud3);
        }
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer), new THREE.Vector2(0, 0));
        this.velocity.x = Random.nextDoubleRange(20, 50);
        this.scroll = new THREE.Vector2(1, 0.85);
    }
    Cloud.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
        if(this.position.x - this.width / 2 > Config.RENDER_WIDTH) {
            this.position.x = -this.width / 2;
            this.position.y = Math.clamp(Random.nextDoubleRange(this.position.y - 10, this.position.y + 10), Config.RENDER_HEIGHT / 2, Config.RENDER_HEIGHT);
            this.velocity.x = Random.nextDoubleRange(20, 50);
        }
    };
    return Cloud;
})(Sprite);
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(position, risingRate, rotation, layer) {
        if(layer == null) {
            layer = Layer.waterForeground;
        }
        if(rotation != null) {
            this.rotation = rotation;
        }
        if(risingRate == null) {
            this.risingRate = 10;
        } else {
            this.risingRate = risingRate;
        }
        var size = new THREE.Vector2(Config.RENDER_WIDTH, Config.RENDER_HEIGHT);
        var texture = new THREE.Texture(Utility.generateImage(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, "#1111BB", 0.23));
        texture.needsUpdate = true;
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer), new THREE.Vector2(1, 1));
        this.material.overdraw = false;
    }
    Water.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
        this.position.y += this.risingRate * dt;
    };
    return Water;
})(Sprite);
var Crate = (function (_super) {
    __extends(Crate, _super);
    function Crate(position, rotation, id, layer) {
        if(layer == null) {
            layer = Layer.crate;
        }
        if(rotation == null) {
            this.rotation = rotation;
        }
        var size = new THREE.Vector2(20, 16);
        var texture = THREE.ImageUtils.loadTexture(Assets.Image.crate);
        _super.call(this, size.x, size.y, texture, new THREE.Vector3(position.x, position.y, layer));
    }
    Crate.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
    };
    return Crate;
})(Sprite);
var TextItem = (function (_super) {
    __extends(TextItem, _super);
    function TextItem(position, maxWidth, lineheight, font, colour, text) {
        this.position = position;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.textAlign = 'start';
        context.textBaseline = 'top';
        context.font = font;
        var textDimensions = this.multiFillText(context, text, new THREE.Vector2(0, 0), maxWidth, lineheight, false);
        canvas.width = textDimensions.x;
        canvas.height = textDimensions.y;
        if(colour == null) {
            context.fillStyle = "white";
        } else {
            context.fillStyle = colour;
        }
        this.multiFillText(context, text, new THREE.Vector2(0, 0), maxWidth, lineheight, true);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        _super.call(this, textDimensions.x, textDimensions.y, texture, position);
        this.material.overdraw = false;
        if(Debug.DRAW_SPRITEBOXES_ENABLED) {
            context.strokeRect(0, 0, canvas.width, canvas.height);
        }
    }
    TextItem.prototype.multiFillText = function (context, text, startPosition, linewidth, lineHeight, draw) {
        text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
        var sections = text.split("\n");
        var i, str, wordWidth, words, currentLine = 1, maxHeight = 0, maxWidth = 0;
        var printNextLine = function (str) {
            if(draw == true) {
                context.fillText(str, startPosition.x, startPosition.y + (lineHeight * currentLine));
            }
            currentLine++;
            wordWidth = context.measureText(str).width;
            if(wordWidth > maxWidth) {
                maxWidth = wordWidth;
            }
        };
        for(i = 0; i < sections.length; i++) {
            words = sections[i].split(' ');
            var index = 1;
            while(words.length > 0 && index <= words.length) {
                str = words.slice(0, index).join(' ');
                wordWidth = context.measureText(str).width;
                if(wordWidth > linewidth) {
                    if(index === 1) {
                        str = words.slice(0, 1).join(' ');
                        words = words.splice(1);
                    } else {
                        str = words.slice(0, index - 1).join(' ');
                        words = words.splice(index - 1);
                    }
                    printNextLine(str);
                    index = 1;
                } else {
                    index++;
                }
            }
            if(index > 0) {
                printNextLine(words.join(' '));
            }
        }
        maxHeight = lineHeight * (currentLine);
        return new THREE.Vector2(maxWidth, maxHeight);
    };
    return TextItem;
})(Sprite);
var CrateScene = (function (_super) {
    __extends(CrateScene, _super);
    function CrateScene(renderer) {
        _super.call(this, renderer);
        var moontex = THREE.ImageUtils.loadTexture(Assets.Image.moon);
        var hill1 = THREE.ImageUtils.loadTexture(Assets.Image.hill1);
        var hill2 = THREE.ImageUtils.loadTexture(Assets.Image.hill2);
        var playertex = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);
        var backgroundGradientTex = THREE.ImageUtils.loadTexture(Assets.Image.bggradient);
        var groundTex = THREE.ImageUtils.loadTexture(Assets.Image.ground);
        var starsTex = THREE.ImageUtils.loadTexture(Assets.Image.stars);
        var moon = new Sprite(77, 75, moontex, new THREE.Vector3(260, 170, Layer.moon), new THREE.Vector2(1.0, 0.9));
        var stars = new Sprite(Config.RENDER_WIDTH, Config.RENDER_HEIGHT, starsTex, new THREE.Vector3(Config.RENDER_WIDTH / 2, Config.RENDER_HEIGHT / 2, Layer.stars), new THREE.Vector2(1, 0.95));
        var player = new Player(new THREE.Vector3(100, 100, Layer.middle));
        var hilltree0 = new Tree(new THREE.Vector2(283, 76), new THREE.Vector3(0, 0, Math.PI / 8), 0);
        var hilltree1 = new Tree(new THREE.Vector2(239, 68), new THREE.Vector3(0, 0, Math.PI / 3), 1);
        var hilltree2 = new Tree(new THREE.Vector2(103, 110), new THREE.Vector3(0, 0, Math.PI / 3), 2);
        this.scene.add(moon);
        this.scene.add(new Sprite(146, 60, hill1, new THREE.Vector3(270, 30, Layer.hill1), new THREE.Vector2(1, 1)));
        this.scene.add(new Sprite(208, 89, hill2, new THREE.Vector3(139, 44, Layer.hill2), new THREE.Vector2(1, 1)));
        this.scene.add(hilltree0);
        this.scene.add(hilltree1);
        this.scene.add(hilltree2);
        this.scene.add(new Lightning(new THREE.Vector2(Config.RENDER_WIDTH / 2, Config.RENDER_HEIGHT / 2)));
        this.scene.add(new Sprite(400, 250, backgroundGradientTex, new THREE.Vector3(Config.RENDER_WIDTH / 2, Config.RENDER_HEIGHT / 2, Layer.back), new THREE.Vector2(1, 1)));
        this.scene.add(stars);
        this.scene.add(new Island(new THREE.Vector2(50, 120)));
        this.scene.add(new Island(new THREE.Vector2(200, 100)));
        this.scene.add(new Island(new THREE.Vector2(290, 60)));
        this.scene.add(new Island(new THREE.Vector2(100, 180)));
        this.scene.add(new Crate(new THREE.Vector2(102, 195)));
        this.scene.add(new Sprite(400, 19, groundTex, new THREE.Vector3(Config.RENDER_WIDTH / 2, 0, Layer.earthBackground), new THREE.Vector2(1, 1)));
        this.scene.add(new Cloud(new THREE.Vector2(-100, Random.nextDoubleRange(200, 225)), new THREE.Vector3(0, 0, 0), 0));
        this.scene.add(new Cloud(new THREE.Vector2(-100, Random.nextDoubleRange(150, 200)), new THREE.Vector3(0, 0, 0), 1));
        this.scene.add(new Cloud(new THREE.Vector2(-100, Random.nextDoubleRange(50, 100)), new THREE.Vector3(0, 0, 0), 2));
        this.scene.add(new Water(new THREE.Vector2(Config.RENDER_WIDTH / 2, -Config.RENDER_HEIGHT)));
        this.scene.add(new TextItem(new THREE.Vector3(46, 227, Layer.front), 200, 12, "12px Helvetica", "white", "GENESIS 6:17"));
        this.scene.add(new TextItem(new THREE.Vector3(194, 191, Layer.front), 350, 12, "12px Helvetica", "white", "I am going to bring floodwaters on the earth to destroy all life under the heavens..."));
        this.scene.add(new TextItem(new THREE.Vector3(178, 160, Layer.front), 350, 12, "12px Helvetica", "white", "...every creature that has the breath of life in it."));
        this.scene.add(new TextItem(new THREE.Vector3(171, 130, Layer.front), 350, 12, "12px Helvetica", "white", "Everything on earth will perish."));
        if(Debug.GUI_ENABLED) {
            Debug.addItems(this.debug, this.scene.children);
            this.debug.add(player.texture.offset, 'x', -1, 1, 0.01);
            this.debug.add(player.texture.offset, 'y', -1, 1, 0.01);
        }
    }
    CrateScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    CrateScene.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    return CrateScene;
})(BaseScene);
var PauseScene = (function (_super) {
    __extends(PauseScene, _super);
    function PauseScene(renderer) {
        _super.call(this, renderer);
    }
    PauseScene.prototype.render = function (dt) {
        _super.prototype.render.call(this, dt);
    };
    PauseScene.prototype.update = function (dt) {
    };
    return PauseScene;
})(BaseScene);
var Game = (function () {
    function Game() {
        this.clock = new THREE.Clock(true);
        this.renderer = new THREE.CanvasRenderer();
        this.paused = false;
        this.started = true;
        if(Debug.GUI_ENABLED) {
            this.gui = new dat.gui.GUI();
        }
        this.renderer.setSize(Config.GAME_WIDTH, Config.GAME_HEIGHT);
        this.renderer.setClearColor(new THREE.Color(0x880088));
        this.renderer.autoClear = false;
        document.getElementById('maingame').appendChild(this.renderer.domElement);
        this.loaderscene = new LoaderScene(this.renderer);
        this.startscreenscene = new StartScreenScene(this.renderer);
        this.gamescene = new CrateScene(this.renderer);
        this.pausescene = new PauseScene(this.renderer);
    }
    Game.prototype.pause = function () {
        this.paused = true;
    };
    Game.prototype.resume = function () {
        this.paused = false;
    };
    Game.prototype.start = function () {
        this.started = true;
    };
    Game.prototype.stop = function () {
        this.started = false;
    };
    Game.prototype.togglePaused = function (p) {
        console.info(p);
        this.paused = p;
        console.info(this.paused);
    };
    Game.prototype.render = function (dt) {
        this.renderer.clear();
        if(!this.started) {
        }
        if(!this.paused) {
            this.gamescene.render(dt);
        }
        if(this.paused) {
        }
    };
    Game.prototype.update = function (dt) {
        if(!this.started) {
            this.startscreenscene.update(dt);
        }
        if(!this.paused) {
            this.gamescene.update(dt);
        }
    };
    Game.prototype.reset = function () {
        this.paused = false;
        this.started = false;
    };
    Game.prototype.onContextRightClick = function (event) {
        if(event.button === 2) {
            event.preventDefault();
        }
    };
    Game.prototype.onCanvasMouseMove = function (event) {
        event.preventDefault();
    };
    Game.prototype.resize = function (event) {
    };
    return Game;
})();
var Main = (function () {
    function Main() {
        this.renderstats = new Stats();
        this.updatestats = new Stats();
        this.clock = new THREE.Clock(true);
        Random.setSeed(Date.now());
        this.game = new Game();
        this.renderstats.setMode(1);
        this.renderstats.domElement.style.position = 'absolute';
        this.renderstats.domElement.style.left = '860px';
        this.renderstats.domElement.style.top = '0px';
        document.body.appendChild(this.renderstats.domElement);
        this.updatestats.setMode(1);
        this.updatestats.domElement.style.position = 'absolute';
        this.updatestats.domElement.style.left = '960px';
        this.updatestats.domElement.style.top = '0px';
        document.body.appendChild(this.updatestats.domElement);
        this.animate();
    }
    Main.prototype.render = function (dt) {
        this.renderstats.begin();
        this.game.render(dt);
        this.renderstats.end();
    };
    Main.prototype.update = function (dt) {
        this.updatestats.begin();
        this.game.update(dt);
        this.updatestats.end();
    };
    Main.prototype.animate = function () {
        var _this = this;
        var _cb = function () {
            var dt = _this.clock.getDelta();
            _this.update(dt);
            _this.render(dt);
            requestAnimationFrame(_cb);
        };
        _cb(_this);
    };
    return Main;
})();
window.onload = function () {
    if(Debug.TERMINAL_ENABLED) {
        var terminal = new Debug.Terminal();
        if(window.console) {
            function customLog(message) {
                terminal.write(message);
            }
        }
    }
    window["main"] = new Main();
};
var Splash = (function () {
    function Splash() { }
    return Splash;
})();
var Animations;
(function (Animations) {
    Animations.explode = {
    };
})(Animations || (Animations = {}));
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(position) {
        var texture = THREE.ImageUtils.loadTexture(Assets.Sprite.player1);
        _super.call(this, 28, 28, texture, position, new THREE.Vector2(1, 1), new THREE.Vector3(4, 2, 8));
        this.anims.push({
            frames: [
                4, 
                5, 
                6, 
                7
            ],
            times: [
                2, 
                2, 
                2, 
                2
            ]
        });
        this.currentAnimation = 0;
    }
    Explosion.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
    };
    return Explosion;
})(Sprite);
var Animations;
(function (Animations) {
    Animations.waveunactivated = {
        frames: [
            0
        ],
        times: [
            0
        ]
    };
    Animations.waveactivated = {
        frames: [
            0
        ],
        times: [
            0
        ]
    };
})(Animations || (Animations = {}));
var Flag = (function (_super) {
    __extends(Flag, _super);
    function Flag(position) {
        var texture = THREE.ImageUtils.loadTexture(Assets.Sprite.flag1);
        _super.call(this, 28, 28, texture, position, new THREE.Vector2(1, 1), new THREE.Vector3(4, 2, 8));
        this.anims.push({
            frames: [
                4, 
                5, 
                6, 
                7
            ],
            times: [
                2, 
                2, 
                2, 
                2
            ]
        });
        this.currentAnimation = 0;
    }
    Flag.prototype.update = function (dt, scrollPoint) {
        _super.prototype.update.call(this, dt, scrollPoint);
    };
    return Flag;
})(Sprite);
var ObjectBuilders;
(function (ObjectBuilders) {
    function buildIsland(scene, params) {
    }
    ObjectBuilders.buildIsland = buildIsland;
})(ObjectBuilders || (ObjectBuilders = {}));
var SceneBuilders;
(function (SceneBuilders) {
    function build(scene) {
    }
    SceneBuilders.build = build;
})(SceneBuilders || (SceneBuilders = {}));
