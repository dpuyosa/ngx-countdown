import { ElementRef, Renderer, OnChanges, SimpleChanges, OnDestroy, EventEmitter } from '@angular/core';
import { Config } from './interfaces/config';
import { Timer } from './timer';
export declare class CountdownComponent implements OnChanges, OnDestroy {
    private el;
    private renderer;
    private timer;
    config: Config;
    start: EventEmitter<{}>;
    finished: EventEmitter<{}>;
    notify: EventEmitter<{}>;
    cls: string;
    constructor(el: ElementRef, renderer: Renderer, timer: Timer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    restart(): void;
    private frequency;
    private _notify;
    private hands;
    private left;
    private init();
    private destroy();
    /**
     * 更新时钟
     */
    private reflow(count?);
    /**
     * 重绘时钟
     */
    private repaint();
    /**
     * 获取倒计时剩余帧数
     */
    private getLeft();
    /**
     * 生成需要的html代码，辅助工具
     */
    private html(con, className, type);
    /**
     * 把值转换为独立的数字形式
     */
    private toDigitals(value, bits);
}
