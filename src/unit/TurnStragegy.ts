import { Board } from "../board/Board";

export interface TurnStrategy {
    board: Board;
    
    processTurn();
}