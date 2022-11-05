import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import errorReducer from './error.reducer';
import allPostsReducer from './allPosts.reducer';
import usersReducer from "./users.reducer";

export default combineReducers({
    userReducer,
    errorReducer,
    usersReducer,
    postReducer,
    allPostsReducer,
})