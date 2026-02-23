function stringToObject(input, finalValue) {
  // write your code below
  
  if(input === '') throw new TypeError();
  
  const keys = []
  let inQuotes = false;
  let current = "";
  for(let i = 0;i < input.length;i++){
     const char = input[i];
     if(char === ""){
        inQuotes = !inQuotes;   
     }
     else if (char === "." && !inQuotes){
        if (current.length > 0) {
            keys.push(current);
            current = "";
        }
     }
     else{
        current += char
     }
  }
  if (current.length > 0) {
    keys.push(current);
  }
  console.log(keys)

  const root = {};
  const pointer = root;

  for(let i = 0; i < keys.length;i++){
    const key = keys[i];
    const isLast = i === keys.length - 1;
    if(isLast) {
      pointer[key] = finalValue;
    }
    else {
        if (!pointer[key]) {
            pointer[key] = {};
        }
        pointer = pointer[key];
    }
  }
  return root
}


console.log(stringToObject("a.b.c.d.e", 2))
