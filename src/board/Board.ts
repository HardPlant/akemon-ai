import { Unit } from "../unit/Unit";

export class Board {
    private width: number;
    private height: number;
    public units: Unit[];
    timeout: NodeJS.Timeout;


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.units = [];
    }

    public static getDistance(src_x: number, src_y: number, dest_x: number, dest_y: number) {
        return Math.abs(dest_x - src_x) + Math.abs(dest_y - src_y);
    }
    addUnit(unit: Unit) {
        if (unit.turnStrategy) {
            unit.turnStrategy.board = this;
        }

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

    issueOneTurn() {
        this.units.forEach((unit)=>{
            console.log(`processing ${unit.name}`);
            setTimeout(unit.processTurn, 1000 / unit.speed);
        });
    }
    /**
     * starts a session
     * all unit will get a turn each 1000/unit.speed
     */
    startSession() {
        this.timeout = setInterval(this.issueOneTurn, 1000);
    }

    endSession() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }
}