import fs from "fs";

function getInputData() {
  const data = fs.readFileSync("input", "utf-8");
  return data.split("\n");
}

function getDigitsFromCalibration(calibration, spelledDigits = []) {
  // O(n) solution
  let left = 0;
  let right = calibration.length - 1;
  let digit = [null, null];

  while (left <= right) {
    if (digit[0] === null) {
      if (isNaN(parseInt(calibration[left]))) {
        for (const key in spelledDigits) {
          const cut = calibration.slice(left, left + spelledDigits[key].length);
          if (cut === spelledDigits[key]) {
            digit[0] = parseInt(key) + 1;
            break;
          }
        }
        left++;
      } else {
        digit[0] = parseInt(calibration[left]);
      }
    }

    if (digit[1] === null) {
      if (isNaN(parseInt(calibration[right]))) {
        for (const key in spelledDigits) {
          const cut = calibration.slice(
            right - spelledDigits[key].length + 1,
            right + 1
          );
          if (cut === spelledDigits[key]) {
            digit[1] = parseInt(key) + 1;
            break;
          }
        }
        right--;
      } else {
        digit[1] = parseInt(calibration[right]);
      }
    }

    if (digit[0] !== null && digit[1] !== null) {
      break;
    }
  }

  return parseInt(`${digit[0]}${digit[1]}`);
}

function main() {
  const lines = getInputData();

  console.time("Part 1");
  const result1 = lines.reduce((acc, line) => {
    return acc + getDigitsFromCalibration(line);
  }, 0);
  console.timeEnd("Part 1");

  const spelled = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  console.time("Part 2");
  const result2 = lines.reduce((acc, line) => {
    return acc + getDigitsFromCalibration(line, spelled);
  }, 0);
  console.timeEnd("Part 2");

  return [result1, result2];
}

console.log(main());
