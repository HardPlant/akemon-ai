import { TurnStrategy } from "./TurnStragegy";

export interface Unit {
    forces: (value: Unit, index: number, array: Unit[]) => value is Unit;
    move(target: Unit);
    attackable(target: Unit);
    
    x?            : number;
    y?            : number;
    turnStrategy? : TurnStrategy;
}