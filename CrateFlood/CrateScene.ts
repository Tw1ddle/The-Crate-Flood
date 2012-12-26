///<reference path='three.d.ts'/>

///<reference path='BaseScene.ts'/>

///<reference path='Rain.ts'/>

class CrateScene extends BaseScene {
    constructor (renderer: THREE.Renderer) {
        super(renderer);

        this.scene.add(new Rain());
    }

    public render(dt: number) {
        super.render(dt);
    }

    public update(dt: number) {
    }
}