// @ts-nocheck

export const circle = (x1, y1, x2, y2, radius1, radius2) => {
  var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  var c1 = d <= radius1 - radius2;
  var c2 = d <= radius2 - radius1;
  var c3 = d < radius1 + radius2;
  var c4 = d === radius1 + radius2;

  if (c1 || c2 || c3 || c4) {
    // console.log(
    //   `the circles x1: ${x1} y1: ${y1} r: ${radius1} and x2: ${x2} y2: ${y2} r2: ${radius2} intersect`
    // );
    // console.log(c1, c2, c3, c4);
    return true;
  } else {
    //console.log("no overlap");
    return false;
  }
};

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
        //console.log("overlappers:", pairs[index]);
        //console.log("data is:", data);

        data.forEach((element, idx) => {
          if (element["id"] == pairs[index][0]["id"]) {
            //console.log("update this boy: ", data[idx]);

            randomizeRepulsion(r1, data[idx]);
            //console.log("boy is updated", data[idx]);
          }

          if (element["id"] == pairs[index][1]["id"]) {
            randomizeRepulsion(r1, data[idx]);
            //data[idx]["x"] -= r1 * 2;
            //console.log("update this boy: ", data[idx]);
          }
        });
      }
    });
  }
};

// the number of possible pairs is (n * (n-1)) / 2
const getPairs = (arr) =>
  arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat();

var lastDirection = 0;

const randomizeRepulsion = (radius, data) => {
  const min = 1;
  const max = 3;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  //console.log(rand, lastDirection);

  while (rand == lastDirection)
    rand = Math.floor(Math.random() * (max - min + 1) + min);

  switch (rand) {
    case 1:
      data["x"] -= radius * 2;
      break;
    case 2:
      data["y"] += radius;
      break;
    case 3:
      data["x"] += radius;
      break;
  }

  lastDirection = rand;
};
