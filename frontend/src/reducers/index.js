import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import usersReducer from "./users.reducers";
import errorReducer from './error.reducer';
import allPostsReducer from './allPosts.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    errorReducer,
    postReducer,
    allPostsReducer,
})