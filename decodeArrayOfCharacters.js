// This is a JavaScript coding problem from BFE.dev 

// https://bigfrontend.dev/problem/decode-message
/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
    let i = 0;
    let j = 0;
    let res = [];
  
    let totalRows = arr.length;
    let totalColumns = arr[0].length;
  
    while(i < totalRows && j < totalColumns){
        res.push(message[i++][j++])
        if(i === totalRows){
          i = i - (totalRows - 1);
        }
    }
  
    return res.join('');
  }
  
const  arr = [
    ['I','B','C','A','K','E','A'],
    ['D','R','F','C','A','E','A'],
    ['G','H','O','E','L','A','D']
    ];

 console.log(decode(arr))   
