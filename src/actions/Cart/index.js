import { post, get, deleteCall, putCall } from "../../api/APIController";
import store from "../../Store";
import {uuidv4} from "../../helper";
import {associateCart} from "../Customer/Login";

export const addToCartItem = async (id, sku) => {
  let data = {
    reference: localStorage.getItem("MYID"),
    data: {
      id: id,
      type: "cart_item",
      quantity: 1,
      sku: sku,
    },
  };

  post("add-to-cart", data, true)
    .then((response) => {
      if (response.status == 200) {
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
};

export const deleteCart = async () => {
  const checkCartIdExist = localStorage.getItem("cartInfo");
  if (checkCartIdExist !== null) {
  const cartID = JSON.parse(checkCartIdExist)?.id
  const cartVersion = Number(JSON.parse(checkCartIdExist)?.version) + 1;
    let url = `deleteCart/${cartID}/${cartVersion}`;
    return new Promise((resolve, reject) => {
    deleteCall(url)
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("cartInfo");
            store.dispatch({
              type: "DELETE_CART_ITEMS",
              cartItems: [],
            });
            resolve(true);
          }
        })
        .catch((error) => {
          reject(false);
          console.log(error);
        })
        .finally();
    });
  }
};

export const deleteCartItems = async (id) => {
  let url = `carts/${localStorage.getItem("MYID")}/items/${id}`;

  deleteCall(url)
    .then((response) => {
      if (response.status == 200) {
        console.log(" CART DELETED", response);
        // toast.success("Item has been removed");
        // store.dispatch({
        //   type: "DELETE_CART_ITEMS",
        //   cartItems: [],
        // });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
};

export const placeOrderWithCT = async (params) => {
  const fulfillmentNo = params.fulfillment
  const dealerID = params.dealer_info.id
  const customerInfo = params.customer
  const payment_mode = params.payment_mode
  let data = {
    currency : params.currency,
    country : params.country,
    shippingAddress : params.shipping_address,
    billingAddress : params.billing_address,
    lineItems : params.lineItems,
  };
  const loggedInUser = JSON.parse(localStorage.getItem("customerInfo"));
  console.log('amit final cart',data)
  return new Promise((resolve, reject) => {
    post("createCart", data, true)
        .then((response) => {
          if (response.status === 201) {
        localStorage.setItem("cartInfo",JSON.stringify(response.data));
        console.log("Created cart. Now placing Order", response);

        const bodyData ={
          id : response.data.id,
          version : response.data.version,
          orderNumber : uuidv4()
        }
            if (loggedInUser !== null) {
              associateCart().then(response => {
                const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
                const bodyData ={
                  id : cartInfo.id,
                  version : cartInfo.version,
                  orderNumber : uuidv4()
                }
                if(response === true){
                  placeOrder(payment_mode,bodyData).then(response => {
                    if(response === true){
                      resolve(true);
                    }
                  })
                }
              })
            }else {
              placeOrder(payment_mode,bodyData).then(response => {
                if(response === true){
                  resolve(true);
                }
              })
            }
      }
        }).catch((error) => {
      reject(false);
      console.log(error);
    })
        .finally();
  });




}
export const placeOrder = async (payment_mode, bodyData) => {
  // let url = `createOrder`;
  let url = `createOrder/${payment_mode}`;
  console.log('placing order with payment_mode', payment_mode, url);

  return new Promise((resolve, reject) => {
    post(url, bodyData)
      .then((response) => {
        if (response.status === 201) {
          deleteCart().then(response =>{
            if (response === true)
            resolve(true);
          });
        }
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};

export const getCartItems = () => {
  let url = `carts/${localStorage.getItem("user_token")}/items`;

  return (dispatch) => {
    return get(url)
      .then((response) => {
        if (response.status == 200) {
          let products = [];
          response.data.data.map((info) => {
            let product = {
              ProductID: info.product_id,
              ProductImage: info.image.href ? info.image.href : "",
              ProductName: info.name,
              Qty: info.quantity,
              Rate: info.meta.display_price.with_tax.unit.amount / 100,
              Sku: info.sku,
              StockStatus: "In Stock",
              cart_id: info.id,

              // id: info.id,
              // name: info.name,
              // pictures: [info.image.href ? info.image.href : ""],
              // stock: info.status == "draft" ? 0 : 1,
              // price: info.meta.display_price.with_tax.unit.amount / 100,
              // discount: 0,
              // salePrice: info.meta.display_price.with_tax.unit.amount / 100,
              // description: info.description,
              // rating: 4,
              // tags: [],
              // size: ["100 CM", "90 CM", "95 CM"],
              // sku: info.sku,
              // category: "",
              // colors: ["black", "gray", "red"],
            };
            products.push(product);
          });

          dispatch({
            type: "GET_CART_SUCCESS",
            cartItems: { items: products, meta: response.data.meta },
          });
          return products;
        }
      })
      .catch()
      .finally();
  };
};

export const updateCartQty = (id, qty) => {
  let url = `/carts/${localStorage.getItem("MYID")}/items/${id}`;
  let params = {
    data: {
      id: id,
      type: "cart_item",
      quantity: qty,
    },
  };

  return (dispatch) => {
    return putCall(url, params)
      .then((response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
        console.log(error);
      })
      .finally();
  };
};

export const createCart = (data) => {
  return (dispatch) => {
    const checkCartIdExist = localStorage.getItem("cartInfo");
    if (checkCartIdExist === null) {
      post("createCart", data, true)
          .then((response) => {
            if (response.status === 201) {
              localStorage.setItem("cartInfo",JSON.stringify(response.data));
              dispatch({
                type: "CREATE_CART_SUCCESS",
                customerCart: response.data,
              });
            }
          })
          .catch()
          .finally();
    }else {
      dispatch({
        type: "CREATE_CART_SUCCESS",
        customerCart: {data:JSON.parse(checkCartIdExist)},
      });
    }
  };
};

