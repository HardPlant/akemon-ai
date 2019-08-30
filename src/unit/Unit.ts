import { TurnStrategy } from "./TurnStragegy";

export interface Unit {
    forces: string;
    move(target: Unit);
    attackable(target: Unit);

    x?            : number;
    y?            : number;
    turnStrategy? : TurnStrategy;
}