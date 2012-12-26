///<reference path='Layer.ts'/>

declare var SPARKS: any; //https://github.com/jeromeetienne/sparkseditor

class Rain extends THREE.Object3D {
    private counter: any = new SPARKS.SteadyCounter(500);
    private emitter: any;

    constructor (position : THREE.Vector2) {
        super();

        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = Layer.rain;

        this.emitter = new SPARKS.Emitter(this.counter);
        this.emitter.addInitializer(new SPARKS.LineZone(new THREE.Vector3(0, 0.2, -10), new THREE.Vector3(0, 0.8, 10)));
        this.emitter.addInitializer(new SPARKS.Lifetime(3, 5));
        this.emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, 0, 0))));

        this.emitter.addAction(new SPARKS.Age());
        this.emitter.addAction(new SPARKS.Move());

        this.emitter.addCallback("created", this.onParticleCreated);
        this.emitter.addCallback("dead", this.onParticleDeath);

        this.emitter.start();
    }

    private onParticleCreated(particle : any) : void {
        particle.target.position = particle.position.clone();
    }

    private onParticleDeath(particle: any): void {
        this.remove(particle.target);
    }
}