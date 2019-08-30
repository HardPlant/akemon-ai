import { Unit } from "./Unit";
import { TurnStrategy } from "./TurnStragegy";
import { MeleeStrategy } from "./MeleeStrategy";
import { Board } from "../board/Board";

export class MeleeUnit implements Unit {

    turnStrategy: TurnStrategy;
    board: Board;

    name: string;
    x: number;
    y: number;
    speed: number;
    forces: string;
    lockOnUnit: Unit;
    range: number;

    move(direct: string) {
        if (direct === "up") {
            if (this.board.isUnitPresent(this.x, this.y + 1)) return;

            this.y < this.board.height ? this.y + 1 : this.board.height;
        }
        if (direct === "down") {
            if (this.board.isUnitPresent(this.x, this.y - 1)) return;

            this.y > 0 ? this.y - 1 : 0;
        }
        if (direct === "left") {
            if (this.board.isUnitPresent(this.x - 1, this.y)) return;

            this.x < this.board.width ? this.x + 1 : this.board.width;
        }
        if (direct === "right") {
            if (this.board.isUnitPresent(this.x + 1, this.y)) return;
            this.x > 0 ? this.x - 1 : 0;
        }
    }

    attack(target: Unit) {
        
    }

    attackable(target: Unit) {
        return true;
    }

    processTurn?() {
        return this.turnStrategy.processTurn();
    }

    constructor(name: string, x: number, y: number, speed: number, forces: string) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.forces = forces;
        this.turnStrategy = new MeleeStrategy(this);
    }

}