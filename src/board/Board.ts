export class Board {
    private width   : number;
    private height  : number;
    private units   : number[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public static getDistance(src_x: number, src_y: number, dest_x: number, dest_y: number) {
        return Math.abs(dest_x - src_x) + Math.abs(dest_y - src_y);
    }
}