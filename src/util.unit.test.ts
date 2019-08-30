import {smoketest} from "./util";

it("successes", () => {
    expect(smoketest()).toBe(1);
});