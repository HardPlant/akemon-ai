import { TurnStrategy } from "./TurnStragegy";

export interface Unit {
    x?            : number;
    y?            : number;
    speed?        : number;
    turnStrategy? : TurnStrategy;
    name?         : string;
    forces: string;

    move(target: Unit);
    attackable(target: Unit);
    processTurn?();
}