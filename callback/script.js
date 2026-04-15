function fetchUserData(callback) {
    fetch("https://jsonplaceholder.typicode.com/users/2").then( (response) => {
        return response.json().then((userData)=> {
            console.log("user details fetched",userData.id); 
            callback(userData.id);
        });
    }).catch((error) => {
        console.log(error);
        
    });
}

//https://jsonplaceholder.typicode.com/users/2

function fetchUserPost(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then( (response) => {
        return response.json().then((posts)=> {
            console.log("user's post",posts);
        })
    }).catch((error) => {
        console.log(error);
        
    })
}
fetchUserData(fetchUserPost);