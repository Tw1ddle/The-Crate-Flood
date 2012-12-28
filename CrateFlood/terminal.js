var Debug;
(function (Debug) {
    Debug.TERMINAL_ENABLED = true;
    var Command = {
        Help: "help",
        Run: "run",
        RendererInfo: "renderer"
    };
    var CVar = {
        TogglePaused: "togglepaused"
    };
    var Terminal = (function () {
        function Terminal() {
            assert(Debug.TERMINAL_ENABLED, 'terminal initialized with console disabled');
            jQuery(document).ready(function ($) {
                $('#tilda').tilda(function (command, terminal) {
                    var keyword = command.split(" ")[0];
                    if(keyword == Command.Help) {
                        terminal.echo("Commands: " + Utility.getKeys(Command));
                        terminal.echo("CVars: " + Utility.getPropertyValuePairs(Command));
                    } else {
                        if(keyword == Command.Run) {
                        } else {
                            if(keyword == Command.Pause) {
                            } else {
                                if(keyword == Command.Resume) {
                                }
                            }
                        }
                    }
                });
            });
        }
        Terminal.prototype.executeFunctionByName = function (name, context) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                args[_i] = arguments[_i + 2];
            }
            var args = Array.prototype.slice.call(arguments).splice(2);
            var namespaces = name.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            return context[func].apply(this, args);
        };
        return Terminal;
    })();
    Debug.Terminal = Terminal;    
})(Debug || (Debug = {}));
//@ sourceMappingURL=terminal.js.map
