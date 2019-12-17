// API/TMDBApi.js

const API_TOKEN = "1732b3fa8edd72c5c4fafff4a6eeceec";

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +
     '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300' + name
}
 export function getFilmDetails(id){
     const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
     return fetch(url)
         .then((response) => response.json())
         .catch((error) => console.error(error))
 }