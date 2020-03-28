import axios from 'axios';

export const setFavorite = (payload) => ({
  type: 'SET_FAVORITE',
  payload,
});

export const deleteFavorite = (payload) => ({
  type: 'DELETE_FAVORITE',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const getVideoSource = (payload) => ({
  type: 'GET_VIDEO_SOURCE',
  payload,
});

export const setUserMovie = (payload) => {
  const { _id, id, cover, title, year, contentRating, duration, isList } = payload;
  return (dispatch) => {
    axios({
      url: '/user-movies',
      method: 'post',
      data: { _id },
    })
      .then(() => {
        dispatch(setFavorite({ _id, id, cover, title, year, contentRating, duration, isList }));
      })
      .then((err) => dispatch(setError(err)));
  };
};

export const deleteUserMovie = (_id) => {
  const movieId = _id;
  return (dispatch) => {
    axios({
      url: `/user-movies/${movieId}`,
      method: 'delete',
    })
      .then(() => {
        dispatch(deleteFavorite(movieId));
      })
      .then((err) => dispatch(setError(err)));
    console.log(movieId);
  };

};

export const registerUser = (payload) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => { window.location.href = '/'; })
      .catch((err) => dispatch(setError(err)));
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.email}`;
        document.cookie = `name=${data.name}`;
        document.cookie = `id=${data.id}`;
        dispatch(loginRequest(data));
      })
      .then(() => { window.location.href = '/'; })
      .catch((err) => dispatch(setError(err)));
  };
};
