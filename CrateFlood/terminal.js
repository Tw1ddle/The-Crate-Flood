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
                    } else {
                        if(keyword == Commands.Context.id) {
                            if(options[0] != null) {
                                currentContext = options[0];
                                terminal.echo("Current context set to: " + currentContext);
                            } else {
                                terminal.echo("Current context: " + currentContext);
                            }
                        } else {
                            if(keyword == Commands.Execute.id) {
                                terminal.echo("Executing: " + options[0] + " in namespace: " + currentContext + " with params: " + options.slice(1, options.length));
                                Utility.executeFunctionByName(currentContext.concat(".").concat(options[0]), window, options.slice(1, options.length));
                            } else {
                                if(keyword == Commands.Dump.id) {
                                    if(options[0] != null) {
                                        terminal.echo("Attempting to dump: " + options[0]);
                                        terminal.echo(Utility.dumpObjectIndented(eval(currentContext.concat("." + options[0]))));
                                    } else {
                                        terminal.echo("Dumping current context:");
                                        terminal.echo(Utility.getPropertyValuePairs(eval(currentContext)));
                                    }
                                } else {
                                    if(keyword == CVars.RendererInfo) {
                                        terminal.echo("Renderer: \n" + Utility.dumpObjectIndented(null) + "\n");
                                    } else {
                                        terminal.echo("Unrecognized keyword: " + "[" + keyword + "]");
                                        terminal.echo("Arguments: \n" + Utility.dumpObjectIndented(options) + "\n");
                                    }
                                }
                            }
                        }
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
//@ sourceMappingURL=terminal.js.map
