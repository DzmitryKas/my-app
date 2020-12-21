import { combineReducers } from "redux";
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';

const rootReducer = combineReducers({
  user: userReducer, 
  files: fileReducer,
  upload: uploadReducer
})

export default rootReducer;