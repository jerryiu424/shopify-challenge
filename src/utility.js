const fetchDetailsById = (apiKey, id) => {
  return fetch(`https://www.omdbapi.com/?apiKey=${apiKey}&i=${id}&plot=full`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Could not fetch results details');
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchMovies = (apiKey, searchTerm, setResults) => {
  return fetch(`https://www.omdbapi.com/?apiKey=${apiKey}&s=${searchTerm}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Could not fetch results');
      } else {
        return res.json();
      }
    })
    .then((data) => {
      setResults(data);
      return data?.Search && Promise.all(
        data?.Search?.map(async (movie) => {
          const { imdbID: id = null } = movie;
          const details = id && await fetchDetailsById(apiKey, id);
          return details;
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
