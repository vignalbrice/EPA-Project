// Store/Reducers/favoriteReducer.js

const initialState = { favoriteFilms: [] }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
      case 'TOGGLE_FAVORITE':
        const favoriteFilmIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id)
        if (favoriteFilmIndex !== -1) {
          // Le film est déjà dans les favoris, on le supprime de la liste
          nextState = {
            ...state,
            favoritesFilm: state.favoriteFilms.filter( (item, index) => index !== favoriteFilmIndex)
          }
        }
        else {
          // Le film n'est pas dans les films favoris, on l'ajoute à la liste
          nextState = {
            ...state,
            favoriteFilms: [...state.favoriteFilms, action.value]
          }
        }
        return nextState || state
    default:
      return state
    }
  }
  
  export default toggleFavorite