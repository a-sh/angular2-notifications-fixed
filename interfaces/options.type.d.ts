import { Icons } from './icons';
export declare type VerticalPosition = 'top' | 'bottom' | 'middle';
export declare type HorizontalPosition = 'right' | 'left' | 'center';
export interface Position extends Array<VerticalPosition | HorizontalPosition> {
    0: VerticalPosition;
    1: HorizontalPosition;
}
export declare type Animate = 'fade' | 'fromTop' | 'fromRight' | 'fromBottom' | 'fromLeft' | 'rotate' | 'scale';
export interface Options {
    position?: Position;
    timeOut?: number;
    showProgressBar?: boolean;
    pauseOnHover?: boolean;
    lastOnBottom?: boolean;
    clickToClose?: boolean;
    clickIconToClose?: boolean;
    maxLength?: number;
    maxStack?: number;
    preventDuplicates?: boolean;
    preventLastDuplicates?: boolean | string;
    theClass?: string;
    rtl?: boolean;
    animate?: Animate;
    icons?: Icons;
}
