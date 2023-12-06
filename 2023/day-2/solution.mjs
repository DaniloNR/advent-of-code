import fs from "fs";

function toSum(acc, val) {
  return acc + val;
}

function getInputData() {
  const lines = fs.readFileSync("input", "utf-8").split("\n");
  const games = new Map();
  for (const game of lines) {
    const [id, plays] = game.split(":");
    const sets = plays.split(";");
    games.set(+id.replace("Game ", ""), sets.reduce(toSetsOfCubes, []));
  }
  return games;
}

function toSetsOfCubes(acc, set) {
  return [
    ...acc,
    {
      ...Object.fromEntries(
        set.split(",").map((cubes) => cubes.split(" ").reverse())
      ),
    },
  ];
}

function computePossibleGamesWithCubes(games, red = 0, green = 0, blue = 0) {
  let possibles = 0;
  const compare = {
    red: (num) => parseInt(num) <= red,
    green: (num) => parseInt(num) <= green,
    blue: (num) => parseInt(num) <= blue,
  };

  for (const [id, game] of games) {
    const isPlayPossible = [];
    for (const play of game) {
      const cubes = Object.entries(play);
      isPlayPossible.push(cubes.every(([color, num]) => compare[color](num)));
    }
    if (!isPlayPossible.includes(false)) {
      possibles += id;
    }
  }
  return possibles;
}

function computeLeastAmountOfCubes(games) {
  const powers = [];

  for (const [_id, game] of games) {
    const least = {};

    for (const play of game) {
      for (const cube in play) {
        least[cube] = Math.max(least[cube] || 0, parseInt(play[cube]));
      }
    }
    powers.push(Object.values(least).reduce((acc, num) => acc * num, 1));
  }

  return powers.reduce(toSum, 0);
}

function main() {
  const games = getInputData();
  console.time("Part 1");
  const possibles = computePossibleGamesWithCubes(games, 12, 13, 14);
  console.timeEnd("Part 1");
  console.time("Part 2");
  const least = computeLeastAmountOfCubes(games, 12, 13, 14);
  console.timeEnd("Part 2");

  return [possibles, least];
}

console.log(main());
