"use strict";
exports.__esModule = true;
var Board = /** @class */ (function () {
    function Board(width, height) {
        this.width = width;
        this.height = height;
    }
    Board.getDistance = function (src_x, src_y, dest_x, dest_y) {
        return Math.abs(dest_x - src_x) + Math.abs(dest_y - src_y);
    };
    return Board;
}());
exports.Board = Board;
