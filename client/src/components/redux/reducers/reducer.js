let INIT_STATE ={
  currentUser: {}
};

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case 'LOGIN_USER':
        return {...state, currentUser: action.payload};
    default: return state
  }
}