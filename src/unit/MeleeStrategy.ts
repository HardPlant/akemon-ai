import { TurnStrategy } from "./TurnStragegy";
import { Unit } from "./Unit";
import { Board } from "../board/Board";

export class MeleeStrategy implements TurnStrategy {
    private controlUnit: Unit;
    private board: Board;
    
    constructor(controlUnit: Unit, board: Board) {
        this.controlUnit = controlUnit;
        this.board = board;
    }

    processTurn() {
        let target = this.board.getNearestUnit(this.controlUnit);

        if (this.controlUnit.attackable(target)) {

        } else {
            this.controlUnit.move(target);
        }
    }

    chooseSkill() {

    }
}