import { Board } from "./Board";
import { Unit } from "../unit/Unit";
import { arrowFunctionExpression } from "@babel/types";
import { MeleeStrategy } from "../unit/MeleeStrategy";
import { TurnStrategy } from "../unit/TurnStragegy";
describe("smoke test", () => {
    it("runs", () => {
        let board: Board = new Board(10, 4);

        expect(typeof (board)).toBe("object");
    });

    it("distance", () => {
        let mockSrcUnit = {
            x: 0,
            y: 0,
        };
        let mockDestUnit = {
            x: 3,
            y: 4,
        };

        expect(Board.getDistance(
            mockSrcUnit.x, mockSrcUnit.y
            , mockDestUnit.x, mockDestUnit.y)).toBe(7);
    });

    it("adds unit", () => {
        let board: Board = new Board(10, 4);
        let mockUnit1 : Unit = {
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnit2 : Unit = {
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };

        board.addUnit(mockUnit1);
        expect(board.units.length).toBe(1);

        board.addUnit(mockUnit2);
        expect(board.units.length).toBe(2);
    });
});

describe("Board.getNearestOpponent", ()=> {
    it("choose nearest Opponent at 1:1", () => {
        let board: Board = new Board(10, 4);
        
        let mockUnit1 : Unit = {
            x:0,
            y:0,
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnit2 : Unit = {
            x:1,
            y:1,
            forces: "1",
            move: ()=>{},
            attackable: ()=>{},
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
    it("choose nearest Opponent at 2:2", () => {
        let board: Board = new Board(4, 4);
        
        let mockUnitA : Unit = {
            x:0,
            y:0,
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnitB : Unit = {
            x:3,
            y:0,
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnitC : Unit = {
            x:0,
            y:3,
            forces: "1",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnitD : Unit = {
            x:3,
            y:3,
            forces: "1",
            move: ()=>{},
            attackable: ()=>{},
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
    it("choose nearest Opponent at 2:2", () => {
        let board: Board = new Board(4, 4);
        
        let mockUnitA : Unit = {
            x:0,
            y:0,
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnitB : Unit = {
            x:2,
            y:2,
            forces: "0",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnitC : Unit = {
            x:1,
            y:1,
            forces: "1",
            move: ()=>{},
            attackable: ()=>{},
        };
        let mockUnitD : Unit = {
            x:3,
            y:3,
            forces: "1",
            move: ()=>{},
            attackable: ()=>{},
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


describe("Board.issueOneTurn", () => {
    jest.useFakeTimers();
    it("starts one-unit session", ()=> {
        let board: Board = new Board(4, 4);
        let isCalled = 0;
        let sampleStrategy : TurnStrategy = {
            board: undefined,
            processTurn: ()=>{
                console.log("[Unit1] Processed");
                isCalled++;
            }
        };

        let mockUnit1 : Unit = {
            name: "mockUnit1",
            forces: "0",
            speed: 100,
            move: ()=>{},
            attackable: ()=>{},
            turnStrategy: sampleStrategy,
            processTurn: ()=>{sampleStrategy.processTurn()}
        };

        board.addUnit(mockUnit1);
        expect(board.units.length === 1);

        board.issueOneTurn();
        
        jest.runOnlyPendingTimers();
        
        expect(isCalled).toBe(1);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10);
    });
    it("starts two-unit session", ()=> {
        let board: Board = new Board(4, 4);
        let isCalled = 0;
        let sampleStrategy1 : TurnStrategy = {
            board: undefined,
            processTurn: ()=>{
                isCalled++;
            }
        };
        let sampleStrategy2 : TurnStrategy = {
            board: undefined,
            processTurn: ()=>{
                isCalled++;
            }
        };
        let mockUnit1 : Unit = {
            name: "mockUnit1",
            forces: "0",
            speed: 100,
            move: ()=>{},
            attackable: ()=>{},
            turnStrategy: sampleStrategy1,
            processTurn: ()=>{sampleStrategy1.processTurn()}
        };

        let mockUnit2 : Unit = {
            name: "mockUnit2",
            forces: "0",
            speed: 500,
            move: ()=>{},
            attackable: ()=>{},
            turnStrategy: sampleStrategy2,
            processTurn: ()=>{sampleStrategy2.processTurn()}
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