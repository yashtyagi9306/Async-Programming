//http://www.omdbapi.com/?i=tt3896198&apikey=2464627cs=${movieName}
document.addEventListener("DOMContentLoaded", () =>{
     const movieForm = document.getElementById("movieForm");
     const movieResults = document.getElementById("movieResults");
     movieForm.addEventListener("submit", (e)=>{
        const movieName = document.getElementById('movieInput').value;
        

        //here the content enetered is vanishing in milisecond as the page reloads.
        //so we are just preventing the browser default 

        e.preventDefault();
        searchMovies(movieName)

    });

        //now searching for the movie by the api
    async function searchMovies(movieName){
        console.log(movieName);
        try{
            movieResults.innerHTML = '<div class="loading">Search movies....</div>'
            const response = await fetch(`http://www.omdbapi.com/?apikey=2464627c&s=${movieName}`);
            const data = await response.json();
            //this error is for the false response we get from the api's
            if (data.response === 'False'){
                throw new Error('No movies found');
            }
            displayMovies(data.Search);

        }catch(error){
            movieResults.innerHTML=`
            <div class='error-message'>
                "Error searching movies. Please try again"
            </div>
            `;

            }   
    };
        
     

    function displayMovies(movies) {
        movieResults.innerHTML = `
              <div class="movies-grid">
                  ${movies
                    .map(
                      (movie) => `
                      <div class="movie-card">
                          <img 
                              src="${
                                movie.Poster !== "N/A"
                                  ? movie.Poster
                                  : "https://via.placeholder.com/300x450?text=No+Poster"
                              }" 
                              alt="${movie.Title}"
                              class="movie-poster"
                             
                          >
                          <div class="movie-info">
                              <h3 class="movie-title">${movie.Title}</h3>
                              <div class="movie-year">${movie.Year}</div>
                          </div>
                      </div>
                  `
                    )
                    .join("")}
              </div>
          `;
  }

      
});