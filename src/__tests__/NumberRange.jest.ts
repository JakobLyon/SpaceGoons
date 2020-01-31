import NumberRange from "../NumberRange";

describe("Range Class Tests", () => {
  it("getRandomInRange() produces 0 or 1 by default", () => {
    const testRange = new NumberRange(undefined, undefined);
    const randomNumber = testRange.getRandomInRange()
    expect([0, 1]).toContain(randomNumber);
  });

  it("getRandomInRange(seed) produces a consistent result", () => {
    const testRange = new NumberRange(1, 9000, 'f0d8368d-85e2-54fb-73c4-2d60374295e3');
    expect(testRange.getRandomInRange()).toBe(213);
  });
});
