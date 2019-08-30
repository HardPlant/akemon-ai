"use strict";
exports.__esModule = true;
var Board_1 = require("./Board");
describe("smoke test", function () {
    var board = new Board_1.Board(10, 4);
    expect(typeof (Board_1.Board)).toBe("board");
});
