import { receiveProducts } from "..";
import { get, post } from "../../api/APIController";
import store from "../../Store";
export const getCustomerOrder = (email) => {
  return (dispatch) => {
    console.log("response", email);
    get(`getOrdersByCustomer`)
      .then((response) => {
        console.log("response", response);
        if (response.status == 200) {
          dispatch({
            type: "GET_ORDER_HISTORY_SUCCESS",
            products: response.data,
          });
        }
      })
      .catch()
      .finally();
  };
};



// import { receiveProducts } from "..";
// import { get, post } from "../../api/APIController";
// import store from "../../Store";
// export const getCustomerOrder = (email) => {
//   return (dispatch) => {
//     console.log("response", email);
//     get(`searchOrdersByEmail/${email}`)
//       .then((response) => {
//         console.log("response", response);
//         if (response.status == 200) {
//           dispatch({
//             type: "GET_ORDER_HISTORY_SUCCESS",
//             products: response.data,
//           });
//         }
//       })
//       .catch()
//       .finally();
//   };
// };
