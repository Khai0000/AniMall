// Constants
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Action Creators
export function rdxLoginUser() {
  return {
    type: LOGIN,
  };
}

export function rdxLogoutUser() {
  return {
    type: LOGOUT,
  };
}

// Initial State
const INITIAL_STATE = {
  isAuth: false,
};

// Reducer
function User(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return { isAuth: true };
    case LOGOUT:
      return { isAuth: false };
    default:
      return state;
  }
}

export default User;
