///<reference path='three.d.ts'/>

module Utility {
    export function isFunction(x: any) : bool {
        return Object.prototype.toString.call(x) == '[object Function]';
    }

    export function generateImage(width: number, height: number, fillStyle: string, alpha: number): HTMLImageElement {
        var canvas: any = document.createElement('canvas');

        assert(canvas, 'canvas image not generated');

        canvas.width = width;
        canvas.height = height;
        
        var context : any = canvas.getContext('2d');

        assert(context, '2d canvas context not found');

        context.fillStyle = fillStyle;
        context.globalAlpha = alpha;
        context.fillRect(0, 0, width, height);

        return canvas;
    }

    //intercept console log calls
    export function modifyConsoleLogging(logic: any) {

    }

    //non-recursive
    // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
    export function getKeys(object: any): string[] {
        return Object.keys(object);
    }

    //non-recursive??
    export function getValues(object: Object): string[] {
        var values: string[] = new string[];
        
        for (var key in object) {
            values.push("[" + object[key] + "]");
        }

        return values;
    }

    //non-recursive??
    export function getPropertyValuePairs(object: Object): string[] {
        var pairs: string[] = new string[];

        for (var key in object) {
            pairs.push("\n\n" + key + "=" + object[key]);
        }

        return pairs;
    }

    export function executeFunctionByName(functionName: string, context: any, params:any[]): any {
        var namespaces = functionName.split(".");
        var func = namespaces.pop();

        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }

        return context[func].apply(context, params);
    }

    //recursive
    //http://stackoverflow.com/questions/130404/javascript-data-formatting-pretty-printer
    export function dumpObjectIndented(obj: any, indent?: string = " ")
    {
      var result = "";
      if (indent == null) indent = "";

      for (var property in obj)
      {
        var value = obj[property];
        if (typeof value == 'string')
          value = "'" + value + "'";
        else if (typeof value == 'object')
        {
          if (value instanceof Array)
          {
            // Just let JS convert the Array to a string!
            value = "[ " + value + " ]";
          }
          else
          {
            // Recursive dump
            // (replace "  " by "\t" or something else if you prefer)
            var od = dumpObjectIndented(value, indent + "  ");
            // If you like { on the same line as the key
            //value = "{\n" + od + "\n" + indent + "}";
            // If you prefer { and } to be aligned
            value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
          }
        }
        result += indent + "'" + property + "' : " + value + ",\n";
      }
      return result.replace(/,\n$/, "");
    }
}