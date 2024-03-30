// @ts-nocheck
import { limitNumberWithinRange } from "./workloadHelper";

/**
 * Decides if two circles are overlapping
 */
export const circle = (x1, y1, x2, y2, radius1, radius2) => {
  var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  var c1 = d <= radius1 - radius2;
  var c2 = d <= radius2 - radius1;
  var c3 = d < radius1 + radius2;
  var c4 = d === radius1 + radius2;

  if (c1 || c2 || c3 || c4) {
    return true;
  } else {
    return false;
  }
};

/**
 * Main function that controls the whole repulsion.
 */
export const checkForOverlap = (graphData) => {
  if (graphData.length <= 1) return;

  const data = graphData;
  const pairs = getPairs(data);

  if (pairs.length > 0) {
    pairs.map((element, index) => {
      const x1 = element[0]["x"];
      const y1 = element[0]["y"];
      const x2 = element[1]["x"];
      const y2 = element[1]["y"];
      const r1 = element[0]["size"] / 10 / 2;
      const r2 = element[1]["size"] / 10 / 2;

      const overlap = circle(x1, y1, x2, y2, r1, r2);

      if (overlap) {
        data.forEach((element, idx) => {
          if (element["id"] == pairs[index][0]["id"]) {
            randomizeRepulsion(r1, data[idx]);
          }

          if (element["id"] == pairs[index][1]["id"]) {
            randomizeRepulsion(r1, data[idx]);
          }
        });
      }
    });
  }
};

// the number of possible pairs is (n * (n-1)) / 2
const getPairs = (arr) =>
  arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat();

// makes sure we don't move in the same direction as previous bubble
var lastDirection = 0;
// graph dimensions ensures we don't go outside the graph
const graphHeight = 5;
const graphWidth = 24;

/**
 * Does the calculations from the movement of the circles when an overlap is
 * detected. Moves the circles only visually on the grpah without altering their
 * original x and y coordinates (keeps data integrity)
 */
const randomizeRepulsion = (radius, data) => {
  const min = 1;
  const max = 4;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);

  while (rand == lastDirection)
    rand = Math.floor(Math.random() * (max - min + 1) + min);

  var movementFactor = radius == 10 ? radius * 2 : radius;

  switch (rand) {
    case 1:
      data["x"] = limitNumberWithinRange(
        data["x"] + movementFactor * 2,
        1,
        graphWidth
      );
      break;
    case 2:
      data["y"] = limitNumberWithinRange(
        data["y"] + movementFactor,
        0,
        graphHeight
      );
      break;
    case 3:
      data["x"] = limitNumberWithinRange(
        data["x"] - movementFactor,
        1,
        graphWidth
      );
      break;
    case 4:
      data["y"] = limitNumberWithinRange(
        data["y"] - movementFactor,
        0,
        graphHeight
      );
      break;
  }

  lastDirection = rand;
};
