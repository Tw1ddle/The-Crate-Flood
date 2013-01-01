///<reference path='Layer.ts'/>

declare var SPARKS: any; //https://github.com/jeromeetienne/sparkseditor

var initColorSize	= function(){
	this.initialize = function( emitter, particle ){
		particle.target.color().setHSV(0.3, 0.9, 0.4);
		particle.target.size(30);
	};
}

class Rain extends THREE.Object3D {
    private counter: any;
    private emitter: any;

    constructor (position : THREE.Vector2) {
        super();

        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = Layer.rain;

        this.counter = new SPARKS.SteadyCounter(50);

        this.emitter = new SPARKS.Emitter(this.counter);
        this.emitter.addInitializer(initColorSize);
        this.emitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(new THREE.Vector3(200, 100, Layer.rain))));
        this.emitter.addInitializer(new SPARKS.Lifetime(3, 5));
       // this.emitter.addInitializer(new SPARKS.Target(null, callback));
        this.emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 0.02, 0))));

        this.emitter.addAction(new SPARKS.Age());
        this.emitter.addAction(new SPARKS.Move());

       // this.emitter.addCallback("created", this.onParticleCreated);
       // this.emitter.addCallback("dead", this.onParticleDeath);

        this.emitter.start();
    }

    private onParticleCreated(particle : any) : void {
        console.info("particle created");
            particle.target.position = particle.position;
    }

    private onParticleDeath(particle: any): void {
       // this.remove(particle.target);
    }

    private initColorSize(emitter: any, particle: any): void {
    }

    private initializeParticle() {
    }
}