const btn = document.getElementById("btn");

btn.addEventListener("click", async function () {
  const loading = document.getElementById('alert');
  loading.innerHTML = "<h1 class='text-center py-5'>Loading.....</h1>"
  let input = document.getElementById("movieInput");
  await fetch("https://imdb-api.com/en/API/SearchMovie/k_7ytp5utp/" + input.value)
    .then((response) => response.json())
    .then(function (response) {
      loading.innerHTML = ''
      let cards = "";
      let movie = response.results;
      movie.forEach(function (movie) {
        cards += `<div class="col-md-4 my-3">
                    <div class="card">
                    <img src="${movie.image}" class="card-img-top img-fluid" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.description}</p>
                        <a href="#" data-movie="${movie.id}" class="btn btn-primary modal-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show user ratings</a>
                      </div>
                  </div>
                </div>`;
        const container = document.getElementById("movieContainer");
        container.innerHTML = cards;

        const modalBtn = document.querySelectorAll(".modal-btn");
        modalBtn.forEach((btn) => {
          btn.addEventListener("click", async function () {
            const movieId = this.dataset.movie;
            await fetch(
              "https://imdb-api.com/en/API/UserRatings/k_7ytp5utp/" + movieId)
              .then((result) => result.json())
              .then(function (result) {
                let movieRes = result.ratings;
                let cardMovie = "";
                movieRes.forEach((rate) => {
                  cardMovie += `<div class='col-md'>
                                  <div class="card mb-3">
                                    <div class="card-body">
                                      <h5 class="card-title">Title : ${movie.title}${movie.description}</h5>
                                      <h6 class="card-subtitle text-muted">Rating: ${rate.rating}</h6>
                                      <p class='card-text'>Percent: ${rate.percent}</p>
                                      <p class='card-text pb-3'>Votes: ${rate.votes}</p>
                                    </div>
                                  </div>
                               </div>`;
                  let modal = document.getElementById("rate");
                  modal.innerHTML = cardMovie;
                });
              });
          });
        });
      });
    })
});
