const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITE':
      if (state.mylist.some((item) => item._id === action.payload._id)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        mylist: [...state.mylist, action.payload],
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        mylist: state.mylist.filter((items) => items._id !== action.payload),
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        playing: state.mylist.find((item) => item._id === action.payload) ||
        state.trends.find((item) => item._id === action.payload) ||
        state.originals.find((item) => item._id === action.payload) ||
        [],
      };

    default:
      return state;
  }
};

export default reducer;

