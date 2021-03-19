import { createStore,combineReducers,applyMiddleware } from "redux";
import { productReducer } from "./productReducer";
import { orderReducer } from "./order";
import { productDetailReducer } from "./productDetail";
import { cart } from "./cart";
import { user } from "./user";
import { review } from "./review";

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	productReducer,productDetailReducer,cart,user,orderReducer,review
})

const store = createStore(rootReducer, applyMiddleware(thunk)
);

export default store;
