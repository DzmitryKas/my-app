import axios from 'axios';

const userPostFetch = user => {
  return dispatch => {
    return axios.post("http://localhost:3000/api/v1/users", {user})
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {

            } else {
              localStorage.setItem("token", data.jwl)
              dispatch(loginUser(data.user))
            }
          })
  }
}

const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})

export { loginUser, userPostFetch }