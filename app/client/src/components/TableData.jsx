import { create, all } from "mathjs";

// make some randomized data for ui test
const config = {
  number: "number",
  precision: 64,
  predictable: false,
  randomSeed: 3,
};
const math = create(all, config);

export default {
  data: [
    [
      "283",
      "Giacomo Guilizzoni",
      new Date("2021-02-08")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "cork 7s",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "823",
      "Marco Botton",
      new Date("2021-02-08")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "quad twisters",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "344",
      "Giacomo Guilizzoni",
      new Date("2021-02-07")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "dspin 7s",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "779",
      "Mariah Maclachlan",
      new Date("2021-02-07")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "back fulls",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "243",
      "Valerie Liberty",
      new Date("2021-02-06")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "cork 7s",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "343",
      "Giacomo Guilizzoni",
      new Date("2021-02-05")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "quad twisters",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "123",
      "Marco Botton",
      new Date("2021-02-02")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "dspin 7s",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
    [
      "564",
      "Mariah Maclachlan",
      new Date("2021-02-01")
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/"),
      "quad twisters",
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
      math.round(math.random(-10, 10), 1).toFixed(1),
    ],
  ],
};
