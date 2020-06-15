export const mergeSort = (arr) => {
  if (arr.length === 1) return arr;

  const middleIdx = Math.floor(arr.length / 2),
    left = mergeSort(arr.slice(0, middleIdx)),
    right = mergeSort(arr.slice(middleIdx));

  let i = 0,
    j = 0;
  const result = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  while (i < left.length) result.push(left[i++]);

  while (j < right.length) result.push(right[j++]);

  return result;
};
