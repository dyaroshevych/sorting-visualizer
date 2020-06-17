const swap = (idx1, idx2, arr) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

export const mergeSort = (arr) => {
  const doMerge = (mainArr, auxArr, start, end, animations) => {
    if (start === end) return;

    const middle = Math.floor((start + end) / 2);
    doMerge(auxArr, mainArr, start, middle, animations);
    doMerge(auxArr, mainArr, middle + 1, end, animations);

    let pointer1 = start,
      pointer2 = middle + 1,
      idx = start;

    while (pointer1 <= middle && pointer2 <= end) {
      animations.push([[pointer1, pointer2]]);
      if (auxArr[pointer1] < auxArr[pointer2]) {
        animations.push([[idx, auxArr[pointer1]]]);
        mainArr[idx++] = auxArr[pointer1++];
      } else {
        animations.push([[idx, auxArr[pointer2]]]);
        mainArr[idx++] = auxArr[pointer2++];
      }
    }

    while (pointer1 <= middle) {
      animations.push([[pointer1, pointer1]]);
      animations.push([[idx, auxArr[pointer1]]]);
      mainArr[idx++] = auxArr[pointer1++];
    }

    while (pointer2 <= end) {
      animations.push([[pointer2, pointer2]]);
      animations.push([[idx, auxArr[pointer2]]]);
      mainArr[idx++] = auxArr[pointer2++];
    }

    return animations;
  };

  return doMerge(arr, [...arr], 0, arr.length - 1, []);
};

export const bubbleSort = (arr) => {
  const animations = [];

  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 1; j < arr.length - i; j++) {
      animations.push([[j - 1, j]]);

      if (arr[j - 1] > arr[j]) {
        swapped = true;
        animations.push([
          [j, arr[j - 1]],
          [j - 1, arr[j]],
        ]);
        swap(j - 1, j, arr);
      } else animations.push([[j, arr[j]]]);
    }

    if (swapped === false) break;
  }

  return animations;
};

export const quickSort = (arr) => {
  const animations = [];

  const move = (start, end) => {
    if (start >= end) return;

    let partitionIdx = start;

    for (let i = start; i <= end; i++) {
      animations.push([[i, partitionIdx]]);
      if (arr[i] <= arr[end]) {
        animations.push([
          [i, arr[partitionIdx]],
          [partitionIdx, arr[i]],
        ]);
        swap(i, partitionIdx++, arr);
      } else animations.push([[i, arr[i]]]);
    }

    move(start, partitionIdx - 2);
    move(partitionIdx, end);
  };

  move(0, arr.length - 1);

  return animations;
};
