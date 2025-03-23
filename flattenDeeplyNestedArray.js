/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    if(n === 0){
       return arr.slice();
   }

   let res = []
   for(let i = 0; i< arr.length ; i++){
       if(Array.isArray(arr[i])){
           const flattenedElements = flat(arr[i],n-1)
           res.push(...flattenedElements)
       }
       else {
           res.push(arr[i])
       }
   }
   return res
};