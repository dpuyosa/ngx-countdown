export declare class Timer {
    private fns;
    private commands;
    private nextTime;
    private ing;
    start(): void;
    private process();
    add(fn: Function, frequency: number): void;
    remove(fn: Function): void;
}