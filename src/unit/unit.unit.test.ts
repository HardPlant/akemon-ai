import { Unit } from "./Unit";
import { MeleeUnit } from "./SampleMeleeUnit";
import { Board } from "../board/Board";

describe("moves", () => {
    it("moves up", ()=> {
        let board = new Board(4, 4);
        let meleeUnit: Unit = new MeleeUnit("meleeUnit", 0, 0, 100, "1");
    
        meleeUnit.board = board;
    
        meleeUnit.move("up");
        expect(meleeUnit.x).toBe(0);
        expect(meleeUnit.y).toBe(1);
    });

    it("moves down", ()=> {
        let board = new Board(4, 4);
        let meleeUnit: Unit = new MeleeUnit("meleeUnit", 3, 3, 100, "1");
    
        meleeUnit.board = board;
    
        meleeUnit.move("down");
        expect(meleeUnit.x).toBe(3);
        expect(meleeUnit.y).toBe(2);
    });
    
    it("moves left", ()=> {
        let board = new Board(4, 4);
        let meleeUnit: Unit = new MeleeUnit("meleeUnit", 3, 3, 100, "1");
    
        meleeUnit.board = board;
    
        meleeUnit.move("left");
        expect(meleeUnit.x).toBe(2);
        expect(meleeUnit.y).toBe(3);
    });
    
    it("moves right", ()=> {
        let board = new Board(4, 4);
        let meleeUnit: Unit = new MeleeUnit("meleeUnit", 0, 0, 100, "1");
    
        meleeUnit.board = board;
    
        meleeUnit.move("right");
        expect(meleeUnit.x).toBe(1);
        expect(meleeUnit.y).toBe(0);
    });

});

describe("attack", () => {

})