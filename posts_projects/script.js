
document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.querySelector(".posts-container");
    const APIUrl = "https://jsonplaceholder.typicode.com/posts";

    async function fetchPosts(){
        try {
            const response = await fetch(APIUrl);
            const posts = await response.json();

            postsContainer.innerHTML = "";

            posts.forEach((post) => {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);                
            });

        } catch(error){
            postsContainer.innerHTML = '<p>Error loading posts</p>';
        }
    }

    function createPostElement(post){
        const article = document.createElement("article");
        article.className = "post-card";

        const title = document.createElement("h2");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.className = "post-body";
        body.textContent = post.body;

        article.appendChild(title);
        article.appendChild(body);

        return article;
    }

    fetchPosts();
});