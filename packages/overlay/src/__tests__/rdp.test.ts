// packages/overlay/src/__tests__/rdp.test.ts
import { describe, it, expect } from "vitest";
import { simplifyPoints } from "../utils/rdp.js";

describe("simplifyPoints (RDP)", () => {
  it("returns input unchanged for 0, 1, or 2 points", () => {
    expect(simplifyPoints([])).toEqual([]);
    expect(simplifyPoints([{ x: 0, y: 0 }])).toEqual([{ x: 0, y: 0 }]);
    expect(simplifyPoints([{ x: 0, y: 0 }, { x: 10, y: 10 }])).toEqual([
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ]);
  });

  it("removes collinear points", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 10, y: 0 },
    ];
    const result = simplifyPoints(points, 1);
    expect(result).toEqual([{ x: 0, y: 0 }, { x: 10, y: 0 }]);
  });

  it("preserves points that deviate beyond epsilon", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ];
    const result = simplifyPoints(points, 1);
    expect(result).toHaveLength(3);
    expect(result[1]).toEqual({ x: 5, y: 10 });
  });

  it("reduces a dense curve to key points", () => {
    // Straight line with slight noise
    const points = Array.from({ length: 100 }, (_, i) => ({
      x: i,
      y: Math.sin(i / 10) * 0.5, // tiny wobble < epsilon
    }));
    const result = simplifyPoints(points, 2);
    expect(result.length).toBeLessThan(points.length);
    expect(result[0]).toEqual(points[0]);
    expect(result[result.length - 1]).toEqual(points[points.length - 1]);
  });
});
