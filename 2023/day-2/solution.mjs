import fs from "fs";

function getInputData() {
  const data = fs.readFileSync("input", "utf-8");
  return data.split("\n");
}

function main() {
  const lines = getInputData();
  console.log(lines);
}

main();
