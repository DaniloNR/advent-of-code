"module";

import fs from "fs";

function getInputData() {
  const data = fs.readFileSync("input", "utf-8");
  return data.split("\n");
}

function getDigitsFromCalibration(calibration) {
  let left = 0;
  let right = calibration.length - 1;
  let digit = [null, null];
  while (left <= right) {
    if (isNaN(parseInt(calibration[left]))) {
      left++;
    } else {
      digit[0] = calibration[left];
    }

    if (isNaN(parseInt(calibration[right]))) {
      right--;
    } else {
      digit[1] = calibration[right];
    }

    if (digit[0] !== null && digit[1] !== null) {
      break;
    }
  }
  return parseInt(`${digit[0]}${digit[1]}`);
}

function main() {
  const lines = getInputData();

  const result = lines.reduce((acc, line) => {
    return acc + getDigitsFromCalibration(line);
  }, 0);

  console.log(result);
}

main();
