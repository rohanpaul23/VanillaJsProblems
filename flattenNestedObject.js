let res = {}

const flattenObect = (obj,parentKey)=>{
    Object.keys(obj).forEach((key)=>{
        let updatedKey = parentKey ? `${parentKey}.${key}` : key;
        if(typeof obj[key] === 'object' && obj[key] !== null){
           let obbb = flattenObect(obj[key],updatedKey)
           res = {...res,...obbb}
        }   
        else {
            res[updatedKey] = obj[key]
        }
    })
    return res
}

let user = {
    name: 'John',
    address: {
        country: 'India',
        state: 'India',
        education: {
            school: "APS",
            year: 2021
        }
    }
};

console.log(flattenObect(user,'user'))

