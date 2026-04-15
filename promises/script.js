const myPromise = new Promise((resolve,reject) => {
    let success = true;
    if(success){
        resolve("operation successful");
    }else{
        reject("operation failed");
    }
});

myPromise
.then((data)=>{console.log(data);
})
.catch((error)=>{console.log(error)})
.finally(()=>{

})