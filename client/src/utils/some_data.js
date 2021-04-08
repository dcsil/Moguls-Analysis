import { create, all } from "mathjs";

// make some randomized data for ui test
const config = {
  number: "number",
  precision: 64,
  predictable: false,
  randomSeed: 3,
};
const math = create(all, config);

const formatDate = (dateStr) => {
  return new Date(dateStr)
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  data: [
    {
      name: "Giacomo Guilizzoni",
      date: formatDate("2021-02-08"),
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
      date: formatDate("2021-02-08"),
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
      date: formatDate("2021-02-07"),
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
      date: formatDate("2021-02-07"),
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
      date: formatDate("2021-02-06"),
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
      date: formatDate("2021-02-05"),
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
      date: formatDate("2021-02-02"),
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
      date: formatDate("2021-02-01"),
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
