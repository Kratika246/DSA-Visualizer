import { Step } from "@/types/Step";

const InsertionSort = (data: number[]) => {
  let temp = [...data];
  let steps: Step[] = [];
  let sorted: number[] = [];
  let n = temp.length;

  for (let i = 1; i < n; i++) {
    let key = temp[i];
    let j = i - 1;

    // Initial comparison step
    steps.push({
      type: "sorting",
      array: [...temp],
      activeIndices: [i, j],
      swapped: false,
      sortedIndices: [...sorted],
    });

    // Shift elements to the right
    while (j >= 0 && temp[j] > key) {
      temp[j + 1] = temp[j];

      steps.push({
        type: "sorting",
        array: [...temp],
        activeIndices: [j, j + 1],
        swapped: true,
        sortedIndices: [...sorted],
      });

      j--;
    }

    temp[j + 1] = key;

    // Insert position
    steps.push({
      type: "sorting",
      array: [...temp],
      activeIndices: [j + 1],
      swapped: true,
      sortedIndices: [...sorted],
    });

    sorted = Array.from({ length: i + 1 }, (_, idx) => idx);

    steps.push({
      type: "sorting",
      array: [...temp],
      activeIndices: [],
      swapped: false,
      sortedIndices: [...sorted],
    });
  }

  return steps;
};

export default InsertionSort;
