function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

export default function unique(arr) {
  let maxLength = arr.length;
  return () => {
    // Fisher–Yates
    const randomIndex = (Math.random() * maxLength--) | 0;
    const item = arr[randomIndex];
    swap(arr, randomIndex, maxLength);
    return item;
  };
}
