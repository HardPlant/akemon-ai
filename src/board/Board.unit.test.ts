import { Board } from "./Board";
import { Unit } from "../unit/Unit";
describe("smoke test", () => {
    it("runs", () => {
        let board: Board = new Board(10, 4);

        expect(typeof (board)).toBe("object");
    });

    it("distance", () => {
        let mockSrcUnit: Unit = {
            x: 0,
            y: 0,
        };
        let mockDestUnit: Unit = {
            x: 3,
            y: 4,
        };

        expect(Board.getDistance(
             mockSrcUnit.x, mockSrcUnit.y
            ,mockDestUnit.x, mockDestUnit.y)).toBe(7);
    });
});