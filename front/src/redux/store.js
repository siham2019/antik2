import { createStore,combineReducers,applyMiddleware } from "redux";
import { productReducer } from "./reducer/productReducer";
import { orderReducer } from "./reducer/order";
import { productDetailReducer } from "./reducer/productDetail";
import { cart } from "./reducer/cart";
import { user } from "./reducer/user";
import { review } from "./reducer/review";

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	productReducer,productDetailReducer,cart,user,orderReducer,review
})

const store = createStore(rootReducer, applyMiddleware(thunk)
);

export default store;