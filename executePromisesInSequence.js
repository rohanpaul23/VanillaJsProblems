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
  

 const executePromisesInSequence = async (tasks,callback) => { 
    let results = [];
    for(const task of tasks) {
        try {
            const result = await task;
            results.push(result);
        } catch(e) {
            results.push(e);
        }
        finally{
            if(results.length === tasks.length) {
                callback(results);
            }   
        }   
    }
 } 

 executePromisesInSequence(tasks, (results) => {  
    console.log(results); 
 })