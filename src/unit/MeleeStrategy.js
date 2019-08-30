"use strict";
exports.__esModule = true;
var MeleeStrategy = /** @class */ (function () {
    function MeleeStrategy(controlUnit) {
        this.controlUnit = controlUnit;
        this.board;
    }
    MeleeStrategy.prototype.processTurn = function () {
        var target = this.board.getNearestOpponent(this.controlUnit);
        console.log("Unit " + this.controlUnit.name + " targets: " + target.name);
        // if (this.controlUnit.attackable(target)) {
        // } else {
        //     this.controlUnit.move(target);
        // }
    };
    MeleeStrategy.prototype.chooseSkill = function () {
    };
    return MeleeStrategy;
}());
exports.MeleeStrategy = MeleeStrategy;
