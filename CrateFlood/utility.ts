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
}