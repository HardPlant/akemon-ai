"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
describe("smoke test", function () {
    it("runs", function () {
        var board = new Board_1.Board(10, 4);
        expect(typeof (board)).toBe("object");
    });
    it("distance", function () {
        var mockSrcUnit = {
            x: 0,
            y: 0
        };
        var mockDestUnit = {
            x: 3,
            y: 4
        };
        expect(Board_1.Board.getDistance(mockSrcUnit.x, mockSrcUnit.y, mockDestUnit.x, mockDestUnit.y)).toBe(7);
    });
    it("adds unit", function () {
        var board = new Board_1.Board(10, 4);
        var mockUnit1 = {
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        var mockUnit2 = {
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        board.addUnit(mockUnit1);
        expect(board.units.length).toBe(1);
        board.addUnit(mockUnit2);
        expect(board.units.length).toBe(2);
    });
});
describe("Board.getNearestOpponent", function () {
    it("choose nearest Opponent at 1:1", function () {
        var board = new Board_1.Board(10, 4);
        var mockUnit1 = {
            x: 0,
            y: 0,
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        var mockUnit2 = {
            x: 1,
            y: 1,
            forces: "1",
            move: function () { },
            attackable: function () { }
        };
        board.addUnit(mockUnit1);
        board.addUnit(mockUnit2);
        expect(board.getNearestOpponent(mockUnit1)).toBe(mockUnit2);
        expect(board.getNearestOpponent(mockUnit2)).toBe(mockUnit1);
    });
    /** A, -, -, B
     *  -, -, -, -
     *  -, -, -, -
     *  C, -, -, D
     *  A, B // C, D
     */
    it("choose nearest Opponent at 2:2", function () {
        var board = new Board_1.Board(4, 4);
        var mockUnitA = {
            x: 0,
            y: 0,
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        var mockUnitB = {
            x: 3,
            y: 0,
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        var mockUnitC = {
            x: 0,
            y: 3,
            forces: "1",
            move: function () { },
            attackable: function () { }
        };
        var mockUnitD = {
            x: 3,
            y: 3,
            forces: "1",
            move: function () { },
            attackable: function () { }
        };
        board.addUnit(mockUnitA);
        board.addUnit(mockUnitB);
        board.addUnit(mockUnitC);
        board.addUnit(mockUnitD);
        expect(board.getNearestOpponent(mockUnitA)).toBe(mockUnitC);
        expect(board.getNearestOpponent(mockUnitB)).toBe(mockUnitD);
    });
    /** A, -, -, -
     *  -, C, -, -
     *  -, -, B, -
     *  -, -, -, D
     *  1: A, B // 2:C, D
     *  A:C, B: C or D
     */
    it("choose nearest Opponent at 2:2", function () {
        var board = new Board_1.Board(4, 4);
        var mockUnitA = {
            x: 0,
            y: 0,
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        var mockUnitB = {
            x: 2,
            y: 2,
            forces: "0",
            move: function () { },
            attackable: function () { }
        };
        var mockUnitC = {
            x: 1,
            y: 1,
            forces: "1",
            move: function () { },
            attackable: function () { }
        };
        var mockUnitD = {
            x: 3,
            y: 3,
            forces: "1",
            move: function () { },
            attackable: function () { }
        };
        board.addUnit(mockUnitA);
        board.addUnit(mockUnitB);
        board.addUnit(mockUnitC);
        board.addUnit(mockUnitD);
        expect(board.getNearestOpponent(mockUnitA)).toBe(mockUnitC);
        expect(board.getNearestOpponent(mockUnitB, 0)).toBe(mockUnitC);
        expect(board.getNearestOpponent(mockUnitB, 1)).toBe(mockUnitD);
        expect(board.getNearestOpponent(mockUnitC, 0)).toBe(mockUnitA);
        expect(board.getNearestOpponent(mockUnitC, 1)).toBe(mockUnitB);
    });
});
describe("Board.issueOneTurn", function () {
    jest.useFakeTimers();
    it("starts one-unit session", function () {
        var board = new Board_1.Board(4, 4);
        var isCalled = 0;
        var sampleStrategy = {
            board: undefined,
            processTurn: function () {
                console.log("[Unit1] Processed");
                isCalled++;
            }
        };
        var mockUnit1 = {
            name: "mockUnit1",
            forces: "0",
            speed: 100,
            move: function () { },
            attackable: function () { },
            turnStrategy: sampleStrategy,
            processTurn: function () { sampleStrategy.processTurn(); }
        };
        board.addUnit(mockUnit1);
        expect(board.units.length === 1);
        board.issueOneTurn();
        jest.runOnlyPendingTimers();
        expect(isCalled).toBe(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10);
    });
    it("starts two-unit session", function () {
        var board = new Board_1.Board(4, 4);
        var isCalled = 0;
        var sampleStrategy1 = {
            board: undefined,
            processTurn: function () {
                isCalled++;
            }
        };
        var sampleStrategy2 = {
            board: undefined,
            processTurn: function () {
                isCalled++;
            }
        };
        var mockUnit1 = {
            name: "mockUnit1",
            forces: "0",
            speed: 100,
            move: function () { },
            attackable: function () { },
            turnStrategy: sampleStrategy1,
            processTurn: function () { sampleStrategy1.processTurn(); }
        };
        var mockUnit2 = {
            name: "mockUnit2",
            forces: "0",
            speed: 500,
            move: function () { },
            attackable: function () { },
            turnStrategy: sampleStrategy2,
            processTurn: function () { sampleStrategy2.processTurn(); }
        };
        board.addUnit(mockUnit1);
        board.addUnit(mockUnit2);
        expect(board.units.length === 2);
        board.issueOneTurn();
        jest.runOnlyPendingTimers();
        expect(isCalled).toBe(2);
        expect(setTimeout).toHaveBeenCalledTimes(3);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2);
    });
});
