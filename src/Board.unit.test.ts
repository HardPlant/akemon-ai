import {Board} from "./Board";

describe("smoke test", () => {
    it ("runs", () => {
        var board = new Board(10, 4);
    
        expect(typeof(Board)).toBe("function");
    });

    it ("distance", () => {
        expect(Board.getDistance(0,0, 3,4)).toBe(7);
    });
});