import Axios from "axios";
import ProductsList from "../api/product.json";
import Request from "../api/config/Interceptor";
import { get } from "../api/APIController";

export const receiveProducts = (categoryData) => {
  return (dispatch) => {
    const productdata = ProductsList;

    return get("getAllProducts/100/createdAt desc")
      .then((response) => {
        console.log("GET PRODUCT", response.data);
        if (response.status === 200) {
          let data = response.data?.results?.filter((info) => info?.masterData?.published);
          let products = [];

          data.map((info) => {
            let category = [];
            if (info?.masterData?.current?.categories && categoryData.results.length) {
              info.masterData.current.categories.forEach((info) => {
                categoryData.results.forEach((catInfo) => {
                  if (catInfo.id === info.id) {
                    category.push(catInfo.name.en);
                  }
                });
              });
            }
            let allImages = []
            if(info?.masterData?.current?.masterVariant?.images){
                  info.masterData.current.masterVariant.images.forEach((image) => {
                  allImages.push(image.url)
              })
            }
            let product = {
              id: info.id,
              name: info.masterData?.current?.name.en,
              pictures: allImages,
              stock: info?.masterData?.current?.masterVariant?.availability?.isOnStock ? info?.masterData?.current?.masterVariant?.availability?.availableQuantity : 0,
              price: info?.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount / 100,
              discount: 0,
              salePrice: info?.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount / 100,
              description: info.masterData?.current?.metaDescription?.en,
              rating: 4,
              tags: category,
              size: ["100 CM", "90 CM", "95 CM"],
              sku: info?.masterData?.current?.masterVariant?.sku,
              variantID: info?.masterData?.current?.masterVariant?.id,
              category: "",
              colors: ["black", "gray", "red"],
            };
            products.push(product);
          });
          dispatch({
            type: "ACTUAL_PRODUCTS",
            products: products,
          });
        }
      })
      .catch()
      .finally();
  };
};
