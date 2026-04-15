fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
    return response.json().then((posts) => {
        console.log("Posts fetched successfully", posts);
        
    });
})
.catch((error) => {
    console.log("Error fetching posts",error);
});
