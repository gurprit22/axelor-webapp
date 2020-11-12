import { combineReducers } from 'redux';
import formDataReducer from './formDataReducer';

const rootReducer = combineReducers({
 formData: formDataReducer
});

export default rootReducer;