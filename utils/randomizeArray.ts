function randomizeArray<T extends unknown>(arr: T[]) {
  const randomizedArr: T[] = [];
  let newArr = [...arr];

  while (newArr.length > 0) {
    const ind = getRandomInt(newArr.length);
    randomizedArr.push(newArr[ind]);
    newArr = [...newArr.slice(0, ind), ...newArr.slice(ind + 1)];
  }

  return randomizedArr;
}

function getRandomInt(max: number) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max); // The maximum is exclusive
}

export default randomizeArray;
