import { Unit } from "../unit/Unit";

export class Board {
    width: number;
    height: number;
    timeout: NodeJS.Timeout;
    public units: Unit[];


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.units = [];
    }
    /**
     * Get Manhattan Distance (Chess-like Board game Distance)
     * @param src_x 
     * @param src_y 
     * @param dest_x 
     * @param dest_y 
     */
    public static getDistance(src_x: number, src_y: number, dest_x: number, dest_y: number) {
        return Math.abs(dest_x - src_x) + Math.abs(dest_y - src_y);
    }

    isUnitPresent(x: number, y: number) {
        let filter = this.units
            .filter((unit)=>unit.x === x)
            .filter((unit)=>unit.y === y);
        
        return filter.length === 0 ? true : false
    }

    /**
     * add unit and register this board
     * @param unit 
     */
    addUnit(unit: Unit) {
        if (unit.turnStrategy) {
            unit.turnStrategy.board = this;
        }
        unit.board = this;

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
     * issue one turn
     * all unit will get a turn each 1000/unit.speed
     */
    issueOneTurn() {
        this.units.forEach((unit)=>{
            console.log(`processing ${unit.name}`);
            setTimeout(unit.processTurn, 1000 / unit.speed);
        });
    }
    /**
     * starts a session
     * 1000 millisecond interval
     */
    startSession() {
        this.timeout = setInterval(this.issueOneTurn, 1000);
    }

    /**
     * end session
     * all unit will be stopped
     */
    endSession() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }
}