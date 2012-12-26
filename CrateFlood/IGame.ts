interface IGame {
    render(dt: number) : void;
    update(dt: number): void;

    pause(): void;
    resume(): void;
}