// DO NOT CHANGE THE FUNCTION NAME

function countNumbers(collection) {
  // write your solution below
  let count = 0;

  for(let i = 0; i < collection.length;i++){
    if(typeof collection[i] === 'number'){
      count++;
    }
    else if(Array.isArray(collection[i])){
      count+=countNumbers(collection[i]);
    }
  }
  return count
};