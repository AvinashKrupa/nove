/**
 * Combine Reducers Redux Data
 */
import { combineReducers } from "redux";
import { IntlReducer as ReducersIntl } from "react-redux-multilingual";

// Create Custome Reducers
import products from "./products";
import filters from "./filters";
import Category from "./Category";
import Login from "./Login/Login";
import Cart from "./Cart";
import slider from "./Home/Slider";
import Dealer from "./Checkout/Dealer";
import OrderReducer from "./Order";
import Products from "./Product";
import Seller from "./Seller";

const appReducer = combineReducers({
  data: products,
  filters: filters,
  category: Category,
  user: Login,
  cart: Cart,
  ReducersIntl,
  content: slider,
  dealer: Dealer,
  orderHistory: OrderReducer,
  productsData:Products,
  SellerData:Seller
});

export const rootReducer = (state, action) => {
  console.log("State", state, "action", action);
  return appReducer(state, action);
};
