import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer, { getUsersReducer } from "./session";
import userTasksReducer from "./task";
import userGroupsReducer, { getCurrGroupReducer, userOwnGroupReducer } from "./group";
import groupRewardsReducer from "./reward";
// import { groupTaskReducer } from "./group";
const rootReducer = combineReducers({
  session: sessionReducer,
  userTasks : userTasksReducer,
  userGroups : userGroupsReducer,
  // groupTask : groupTaskReducer,
  currGroup : getCurrGroupReducer,
  userOwnGroups: userOwnGroupReducer,
  allUsers : getUsersReducer,
  groupRewards : groupRewardsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
