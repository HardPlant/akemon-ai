"use strict";
exports.__esModule = true;
var Board = /** @class */ (function () {
    function Board(width, height) {
        this.width = width;
        this.height = height;
        this.units = [];
    }
    /**
     * Get Manhattan Distance (Chess-like Board game Distance)
     * @param src_x
     * @param src_y
     * @param dest_x
     * @param dest_y
     */
    Board.getDistance = function (src_x, src_y, dest_x, dest_y) {
        return Math.abs(dest_x - src_x) + Math.abs(dest_y - src_y);
    };
    Board.prototype.isUnitPresent = function (x, y) {
        var filter = this.units
            .filter(function (unit) { return unit.x === x; })
            .filter(function (unit) { return unit.y === y; });
        return filter.length === 0 ? true : false;
    };
    /**
     * add unit and register this board
     * @param unit
     */
    Board.prototype.addUnit = function (unit) {
        if (unit.turnStrategy) {
            unit.turnStrategy.board = this;
        }
        unit.board = this;
        return this.units.push(unit);
    };
    /**
     * Get Nearest Opponent
     * @param controlUnit
     * @param index optional, test purpose
     */
    Board.prototype.getNearestOpponent = function (controlUnit, index) {
        var candidates = this.units.filter(function (unit) { return unit.forces !== controlUnit.forces; });
        var candidatesLength = candidates.map(function (item) { return Board.getDistance(item.x, item.y, controlUnit.x, controlUnit.y); });
        var nearestLength = Math.min.apply(Math, candidatesLength);
        var minUnits = candidates.filter(function (item) { return Board.getDistance(item.x, item.y, controlUnit.x, controlUnit.y) == nearestLength; });
        return typeof (index) === "undefined" ?
            minUnits[Math.floor(minUnits.length * Math.random())]
            : minUnits[index];
    };
    /**
     * issue one turn
     * all unit will get a turn each 1000/unit.speed
     */
    Board.prototype.issueOneTurn = function () {
        this.units.forEach(function (unit) {
            console.log("processing " + unit.name);
            setTimeout(unit.processTurn, 1000 / unit.speed);
        });
    };
    /**
     * starts a session
     * 1000 millisecond interval
     */
    Board.prototype.startSession = function () {
        this.timeout = setInterval(this.issueOneTurn, 1000);
    };
    /**
     * end session
     * all unit will be stopped
     */
    Board.prototype.endSession = function () {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    };
    return Board;
}());
exports.Board = Board;
