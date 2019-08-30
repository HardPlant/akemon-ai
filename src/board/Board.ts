import { Unit } from "../unit/Unit";

export class Board {
    private width: number;
    private height: number;
    public units: Unit[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.units = [];
    }

    public static getDistance(src_x: number, src_y: number, dest_x: number, dest_y: number) {
        return Math.abs(dest_x - src_x) + Math.abs(dest_y - src_y);
    }
    addUnit(unit: Unit) {
        unit.turnStrategy.board = this;

        return this.units.push(unit);
    }

    /**
     * Get Nearest Opponent
     * @param controlUnit 
     * @param index optional, test purpose
     */
    getNearestOpponent(controlUnit: Unit, index?: number): Unit {
        let candidates = this.units.filter((unit) => unit.forces !== controlUnit.forces);
        let candidatesLength = candidates.map((item) => Board.getDistance(item.x, item.y, controlUnit.x, controlUnit.y));
        let nearestLength = Math.min.apply(Math, candidatesLength);
        let minUnits = candidates.filter(item => Board.getDistance(item.x, item.y, controlUnit.x, controlUnit.y) == nearestLength);

        return typeof(index) === "undefined" ? 
            minUnits[Math.floor(minUnits.length * Math.random())]
            : minUnits[index];
    }

    /**
     * starts a session, makes 
     */
    startSession() {
        this.units.forEach((unit)=>{
            setTimeout(unit.processTurn, 1000 / unit.speed);
        });
    }
}