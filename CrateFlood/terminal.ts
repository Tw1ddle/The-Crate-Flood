///<reference path='tslib/jquery-1.8.d.ts'/>

///<reference path='assert.ts'/>

module Debug {
    export var TERMINAL_ENABLED: bool = true;

    //generic
    var Commands: any = {
        Help: { id: "help", description: "lists your options" },
        Context: { id: "context", description: "returns the current execution context" },
        Dump: { id: "dump", description: "dumps the named object" },
        Keys: { id: "keys", description: "dumps the keys of the named object" },
        Execute: { id: "run", description: "executes the named function" },
    }

    //game-specific
    var CVars: any = {
        TogglePaused: "togglepaused",
        RendererInfo: "renderer",
    }

    var Namespaces: any = {
        Game: "main.game",
        Main: "main",
    }

    var currentContext: string = Namespaces.Game;

    // Uses eval
    // also uses the 'window' context
    export class Terminal {
        constructor () {
            assert(TERMINAL_ENABLED, 'terminal initialized with terminal disabled');

            jQuery(document).ready(function ($) {
                $('#tilda').tilda(function (input: string, terminal: any): void {

                    var args = input.split(" ");

                    var keyword: string = args[0];
                    var options: string[] = args.slice(1, args.length);

                    if (keyword == Commands.Help.id) {
                        terminal.echo("Remember - some methods are private/cannot be called");
                        terminal.echo("Commands: \n\n" + Utility.dumpObjectIndented(Commands, " ") + "\n");
                        terminal.echo("CVars: " + Utility.dumpObjectIndented(CVars, " ") + "\n");
                        terminal.echo("Contexts: " + Utility.dumpObjectIndented(Namespaces, " ") + "\n");
                    }

                    else if (keyword == Commands.Context.id) {
                        if (options[0] != null) {
                            currentContext = options[0];
                            terminal.echo("Current context set to: " + currentContext);
                        }
                        else {
                            terminal.echo("Current context: " + currentContext);
                        }
                    }

                    else if (keyword == Commands.Execute.id) {
                        terminal.echo("Executing: " + options[0] + " in namespace: " + currentContext + " with params: " + options.slice(1, options.length));
                        Utility.executeFunctionByName(currentContext.concat(".").concat(options[0]), window, options.slice(1, options.length));
                    }

                    else if (keyword == Commands.Dump.id) {
                        if (options[0] != null) {
                            terminal.echo("Attempting to dump: " + options[0]);
                            terminal.echo(Utility.dumpObjectIndented(eval(currentContext.concat("." + options[0]))));
                        }
                        else {
                            terminal.echo("Dumping current context:");
                            //terminal.echo(Utility.dumpObjectIndented(eval(currentContext)));
                            terminal.echo(Utility.getPropertyValuePairs(eval(currentContext))); //non-recursive so nothing explodes
                        }
                    }


                    else if (keyword == CVars.RendererInfo) {
                        terminal.echo("Renderer: \n" + Utility.dumpObjectIndented(null) + "\n"); //todo
                    }

                    else {
                        terminal.echo("Unrecognized keyword: " + "[" + keyword + "]");
                        terminal.echo("Arguments: \n" + Utility.dumpObjectIndented(options) + "\n");
                    }

                });
            });
        }

        public write(message: string): void {
        }
    }

}