import { Board } from "./Board";
import { Unit } from "../unit/Unit";
describe("smoke test", () => {
    it("runs", () => {
        var board = new Board(10, 4);

        expect(typeof (Board)).toBe("function");
    });

    it("distance", () => {
        var mockSrcUnit = {
            getX: jest.fn(() => 0),
            getY: jest.fn(() => 0)
        };
        var mockDestUnit = {
            getX: jest.fn(() => 3),
            getY: jest.fn(() => 4)
        };

        expect(Board.getDistance(mockSrcUnit.getX(), mockSrcUnit.getY()
            ,mockDestUnit.getX(), mockDestUnit.getY())).toBe(7);
    });
});