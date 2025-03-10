const chop = (arr,limit) => {
    let i = 0;
    let chops = []

    while(i<arr.length) {
        chops.push(arr.slice(i, i+limit));
        i+=limit;
    }
    return chops;
}


const mapLimit = (arr, limit, asyncIterator,finalCallBack) => {
    const choppedArr = chop(arr,limit);
    const results = [];

    for(let i=0; i<choppedArr.length; i++) {
        const chunk = choppedArr[i];
        console.log(`Batch: ${i+1}`);
        for(const c of chunk){
            asyncIterator(c, (result) => {
                results.push(result);
                if(results.length === arr.length) {
                    finalCallBack(results);
                }
            });
        }
    }
    console.log('results:', results);
    return results;
}


function getUserById(id, callback) {
    setTimeout(() => {
      callback('User' + id);
    }, 100);
  }


console.log(mapLimit([1,2,3,4,5,6,7,8,9,10],3,getUserById,(allResults) => {
    console.log('all Results:', allResults); // ["User1", "User2", "User3", "User4", "User5"]
  })) // [[1,2,3],[4,5,6],[7,8,9],[10]]