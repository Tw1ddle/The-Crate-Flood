///<reference path='three.d.ts'/>

///<reference path='Sprite.ts'/>
///<reference path='Random.ts'/>

///<reference path='Crate.ts'/>
///<reference path='Tree.ts'/>
///<reference path='Flag.ts'/>

module ObjectBuilders {
    export interface islandBuilderParameters {
        trees: number;
        crates: number;
        flags: number;
    }

    export function buildIsland(scene: THREE.Scene, params: islandBuilderParameters) : void {
    }
}