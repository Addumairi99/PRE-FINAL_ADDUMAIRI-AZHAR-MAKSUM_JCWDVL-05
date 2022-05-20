import { LOGIN, LOGOUT } from "../actions/types";

// define initial value
const INITIAL_STATE = {
  name: "",
  username: "",
  email: "",
  bio: "",
  status: "",
  uid: "",
  id: "",
  profilePicture: "",
};

// 2. create Reducer
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        name: action.payload.name,
        bio: action.payload.bio,
        status: action.payload.status,
        uid: action.payload.uid,
        id: action.payload.id,
      };
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default userReducer;
