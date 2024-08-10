import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import pageReducer from './reducers/pageReducer'; // Путь к pageReducer
import experienceListReducer from './reducers/experienceListReducer'; // Путь к experienceListReducer

const rootReducer = combineReducers({
  experienceList: experienceListReducer,
  page: pageReducer,
});

const store = createStore(rootReducer);

export { store, Provider };
