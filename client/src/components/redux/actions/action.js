import axios from 'axios';

const userPostFetch = user => {
  return dispatch => {
    return axios.post("http://localhost:5000/api/user", {user})
          .then(data => {
            console.log(data.data)
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