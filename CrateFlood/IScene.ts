///<reference path='tslib/three.d.ts'/>

interface IScene {
    render(dt: number) : void;
    update(dt: number): void;
}