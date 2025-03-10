function createAsyncTask() {
    const value = Math.floor(Math.random() * 10);
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value < 5) {
          reject(`Error ${value}`);
        } else {
          resolve(value * 1000);
        }
      }, value * 1000);
    });
  }
  
  let tasks = [
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask()
  ];
  

 const executePromisesInParallel = async (tasks,callback) => { 
    let results = [];
    tasks.forEach(element => {
        element.then(()=>{
            results.push(element);
        }).catch((e)=>{
            results.push(e);
        }).finally(()=>{
            if(results.length === tasks.length) {
                callback(results);
            }
        })
    });
 } 
