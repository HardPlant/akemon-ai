import { TurnStrategy } from "./TurnStragegy";
import { Unit } from "./Unit";
import { Board } from "../board/Board";

export class MeleeStrategy implements TurnStrategy {
    private controlUnit: Unit;
    board: Board;
    
    constructor(controlUnit: Unit) {
        this.controlUnit = controlUnit;
        this.board;
    }

    processTurn() {
        let target = this.board.getNearestOpponent(this.controlUnit);
        console.log(`Unit ${this.controlUnit.name} targets: ${target.name}`);
        // if (this.controlUnit.attackable(target)) {

        // } else {
        //     this.controlUnit.move(target);
        // }
    }

    chooseSkill() {

    }
}