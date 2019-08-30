import { TurnStrategy } from "./TurnStragegy";
import { Board } from "../board/Board";

export interface Unit {
    x?            : number;
    y?            : number;
    speed?        : number;
    turnStrategy? : TurnStrategy;
    name?         : string;
    board?: Board;
    lockOnUnit?: Unit;
    range?: number;
    forces: string;

    move(direct: string);
    attackable(target: Unit);
    processTurn?();
}