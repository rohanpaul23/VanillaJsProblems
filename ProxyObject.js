const obj = {
    name : "John Doe",
    gender : "Male",
    age : 25,
    address : {
        city : "Bangalore",
    }        
}

const proxiedbject = new Proxy(obj, {
    get(target, key) {
        console.log(`Get operation on ${key}`);
        return target[key];
    },
    set(target, key, value) {
        if(key === 'gender' && (value !== 'Male' || value !== 'Female')) {
            throw new Error("Gender can be only male or female");
        }
        else {
            console.log(`Set operation on ${key}`);
            target[key] = value;
        }   
    }
});
proxiedbject.age = 30
console.log(proxiedbject);


// Variant get incremented value each time property is accessed


const proxiedbject2 = new Proxy(obj, {
    get(target, key) {
        target[key] = target[key] ? target[key] + 1 : 1;
        return target[key];
    },
    set(target, key, value) {
        if(key === 'gender' && (value !== 'Male' || value !== 'Female')) {
            throw new Error("Gender can be only male or female");
        }
        else {
            console.log(`Set operation on ${key}`);
            target[key] = value;
        }   
    }
});

console.log(proxiedbject2.age)
console.log(proxiedbject2.age);
console.log(proxiedbject2.age);
console.log(proxiedbject2.age);
console.log(proxiedbject2.age);
