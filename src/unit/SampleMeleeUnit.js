"use strict";
exports.__esModule = true;
var MeleeStrategy_1 = require("./MeleeStrategy");
var MeleeUnit = /** @class */ (function () {
    function MeleeUnit(name, x, y, speed, forces) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.forces = forces;
        this.turnStrategy = new MeleeStrategy_1.MeleeStrategy(this);
    }
    MeleeUnit.prototype.move = function (direct) {
        if (direct === "up") {
            if (this.board.isUnitPresent(this.x, this.y + 1))
                return;
            this.y < this.board.height ? this.y + 1 : this.board.height;
        }
        if (direct === "down") {
            if (this.board.isUnitPresent(this.x, this.y - 1))
                return;
            this.y > 0 ? this.y - 1 : 0;
        }
        if (direct === "left") {
            if (this.board.isUnitPresent(this.x - 1, this.y))
                return;
            this.x < this.board.width ? this.x + 1 : this.board.width;
        }
        if (direct === "right") {
            if (this.board.isUnitPresent(this.x + 1, this.y))
                return;
            this.x > 0 ? this.x - 1 : 0;
        }
    };
    MeleeUnit.prototype.attack = function (target) {
    };
    MeleeUnit.prototype.attackable = function (target) {
        return true;
    };
    MeleeUnit.prototype.processTurn = function () {
        return this.turnStrategy.processTurn();
    };
    return MeleeUnit;
}());
exports.MeleeUnit = MeleeUnit;
