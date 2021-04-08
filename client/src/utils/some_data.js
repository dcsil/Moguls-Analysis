import { create, all } from "mathjs";

// make some randomized data for ui test
const config = {
  number: "number",
  precision: 64,
  predictable: false,
  randomSeed: 3,
};
const math = create(all, config);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  data: [
    {
      name: "Giacomo Guilizzoni",
      date: new Date("2021-02-08")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "cork 7s",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00064.mp4",
    },
    {
      name: "Marco Botton",
      date: new Date("2021-02-08")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "quad twisters",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00065.mp4",
    },
    {
      name: "Giacomo Guilizzoni",
      date: new Date("2021-02-07")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "dspin 7s",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00066.mp4",
    },
    {
      name: "Mariah Maclachlan",
      date: new Date("2021-02-07")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "back fulls",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00067.mp4",
    },
    {
      name: "Valerie Liberty",
      date: new Date("2021-02-06")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "cork 7s",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00068.mp4",
    },
    {
      name: "Giacomo Guilizzoni",
      date: new Date("2021-02-05")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "quad twisters",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00069.mp4",
    },
    {
      name: "Marco Botton",
      date: new Date("2021-02-02")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "dspin 7s",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00070.mp4",
    },
    {
      name: "Mariah Maclachlan",
      date: new Date("2021-02-01")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      trick: "quad twisters",
      hipChestAngle: math.round(math.random(170, 190), 1).toFixed(0),
      kneeHipAngle: math.round(math.random(170, 190), 1).toFixed(0),
      chestArmAngle: math.round(math.random(170, 190), 1).toFixed(0),
      armAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      kneeAngleDiff: math.round(math.random(0, 10), 1).toFixed(0),
      videoName: "2017-06-05-WhistlerWaterRamp-00071.mp4",
    },
  ],
};
