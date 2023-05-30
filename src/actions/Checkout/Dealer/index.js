import {post} from "../../../api/APIController";
import store from "../../../Store";
export const getDealer = (zipcode = 78207, skuItems) => {
  return (dispatch) => {
    post(`get_dealersByInvZip/${zipcode}`, skuItems, true)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "GET_DEALER_SUCCESS",
            dealer: response.data,
          });
        }
      })
      .catch()
      .finally();
  };
};
