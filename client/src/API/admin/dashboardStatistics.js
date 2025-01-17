import { ADMIN_API } from "../API";

export const fetchStatistics = async (setStatistics) => {
  try {
    const res = await ADMIN_API.get(
      `/admin/get_sales_statistics`
    );
    if (res.status === 200) {
      setStatistics(res?.data?.statistics);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchBestSellingProducts = async (setBestSellingProducts) => {
  try {
    const res = await ADMIN_API.get(
      `/admin/best_sellings_products`
    );
    if (res.status === 200) {
      setBestSellingProducts(res?.data?.products);
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchBestSellingBrands = async (setBestSellingBrands) => {
  try {
    const res = await ADMIN_API.get(
      `/admin/best_selling_brands`
    );
    if (res.status === 200) {
      setBestSellingBrands(res?.data?.brands);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchBestSellingCategories = async (setBestSellingCategories) => {
  try {
    const res = await ADMIN_API.get(
      `/admin/best_selling_categories`
    );
    if (res.status === 200) {
      setBestSellingCategories(res?.data?.categories);
    } else {
      console.log(res?.data?.message);
    }
  } catch (error) {
    console.log(error?.message);
  }
};
