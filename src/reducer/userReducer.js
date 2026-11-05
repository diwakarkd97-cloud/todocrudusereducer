export const ACTIONS = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

export const initialState = {
  users: [],
  loading: false,
  error: null
};

export function userReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case ACTIONS.ADD_USER:
      return { ...state, loading: false, users: [action.payload, ...state.users] };

    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        )
      };

    case ACTIONS.DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload)
      };

    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}