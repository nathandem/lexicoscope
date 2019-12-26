export function simpleArrStrToStr (arr) {
  return arr.map(el => `${el} `);
}

export const getString = (value) => {
  if (typeof(value) === 'number') {
    return value.toString();
  }
  return value;
}

export const getFloat = (value) => {
  if (typeof(value) === 'string') {
    return parseFloat(value);
  }
  return value;
}
