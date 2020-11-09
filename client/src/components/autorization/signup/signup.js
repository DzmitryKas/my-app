import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userPostFetch} from '../../redux/actions/action'; 
import './signup.scss';

const Signup = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');

  const handleChange = event => {   
    if(event.target.name === 'username') {setUserName(event.target.value)};
    if(event.target.name === 'password') {setPassword(event.target.value)};
    if(event.target.name === 'avatar') {setAvatar(event.target.value)};
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.userPostFetch({userName, password, avatar})
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up For An Account</h1>
      <label htmlFor="">Username</label>
      <input
        type='text'
        name='username'
        placeholder='Username'
        value={userName}
        onChange={handleChange}
      ></input>
      <label htmlFor="">Password</label>
      <input 
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <label htmlFor="">Avatar</label>
      <input 
        name='avatar'
        placeholder='Avatar (URL)'
        value={avatar}
        onChange={handleChange}
      />
      <input type="submit" className='btn'/>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup)
