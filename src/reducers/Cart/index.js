/***
 *  CART Reducers
 ***/

const initialState = {
  cartItems: [],
  customerCart:{},
};
const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CART_SUCCESS":
      return {
        ...state,
        customerCart: action.customerCart,
      };
      case "GET_CART_SUCCESS":
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case "DELETE_CART_ITEMS":
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};
export default CartReducer;
