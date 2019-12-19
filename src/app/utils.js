// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
export function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

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
