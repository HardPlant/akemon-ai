import { Unit } from "./Unit";
import { TurnStrategy } from "./TurnStragegy";
import { MeleeStrategy } from "./MeleeStrategy";

export class MeleeUnit implements Unit {
    name: string;
    x: number;
    y: number;
    speed: number;
    turnStrategy: TurnStrategy;
    forces: string;
    
    move(target: Unit) {
        throw new Error("Method not implemented.");
    }
    attackable(target: Unit) {
        throw new Error("Method not implemented.");
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