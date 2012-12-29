///<reference path='three.d.ts'/>

class CanvasText extends THREE.Object3D {
    constructor (position: THREE.Vector3, text: string, size?: number, font?: any, colour?: any) {
        super();

        this.position = position;

        var canvas : any = document.createElement('canvas');
        var context = canvas.getContext('2d');

        
    }

    private createTextCanvas(text: string, size?: number, font?: any, colour?: any) {
    }

    private createText2D() {
    }
}