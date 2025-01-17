import { showBlockConfirmation } from "../../helpers/Sweat.js";
import { toast } from "react-toastify";
import { showToast } from "../../helpers/toast.js";
import { ADMIN_API } from "../API.js";

export const handleToggleBlock = async (id, currentStatus,loadUsers) => {
    const newStatus = currentStatus === true ? false : true;

    const title = `Do you want to ${newStatus ? 'Unblock' : 'Block'} the user?`;

    showBlockConfirmation(title, newStatus, async () => {
      try {
        await ADMIN_API.put(`/admin/toggleBlock`, { id, status: newStatus });

        loadUsers();
        toast.success(`User has been ${newStatus ? 'unblocked' : 'blocked'}`);
      } catch (error) {
        console.error('Error blocking/unblocking user:', error);
        toast.error('Failed to update user status');
      }
    }, () => {
      console.log('Action canceled');
    });
  };

export const handleToggleProductBlock = async (id, currentStatus,loadProducts) => {
    const newStatus = currentStatus ? false : true; 
    const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the product?`;

    showBlockConfirmation(title, newStatus, async () => {
      try {
        await ADMIN_API.put(`/admin/toggleBlockProduct`, { id, status: newStatus });
        loadProducts();
        toast.success(`Product has been ${newStatus ? 'listed' : 'unlisted'}`);
      } catch (error) {
        console.error('Error blocking product:', error);
        toast.error('Failed to update product status');
      }
    });
  };

export  const handleDeleteProduct = async (id,loadProducts) => {
    const title = 'Do you want to delete this product?';
    showBlockConfirmation(title, 'delete', async () => {
      try {
        const res = await ADMIN_API.delete(`/admin/delete_product/${id}`)
        if (res.status === 200) {
            loadProducts()
          showToast('Product deleted successfully', 'light', 'success');
        } else {
          showToast('Product failed to delete!', 'dark', 'error');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Error deleting product', 'dark', 'error');
      }
    });
  }

export const fetchBrands = async (setBrands) => {
    try {
      const res = await ADMIN_API.get(`/admin/get_all_brands`);
      if (res.status === 200) {
        const validBrands = res.data.filter(brand => brand.status === true);
        setBrands(validBrands);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchCategories = async (setCategories) => {
    try {
      const res = await ADMIN_API.get(`/admin/get_all_categories`);
      if (res.status === 200) {
        const validCategories = res.data.filter(category => category.status === true);
        setCategories(validCategories);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const fetchEditProduct = async (id,setProduct) => {
    try {
      const res = await ADMIN_API.get(`/admin/get_edit_product/${id}`);
      if (res.status === 200) {
        setProduct(res?.data);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error('Error fetching ');
    }
}

export const handleToggleBrandsBlock = async (id, currentStatus,loadBrands) => {
  const newStatus = currentStatus ? false : true; 
  const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the Brand?`;

  showBlockConfirmation(title, newStatus, async () => {
    try {
      await ADMIN_API.put(`/admin/toggleBlockBrands/${id}`, { status: newStatus });
      loadBrands();
      toast.success(`Brand has been ${newStatus ? 'listed' : 'unlisted'}`);
    } catch (error) {
      console.error('Error blocking Brand:', error);
      toast.error('Failed to update Brand status');
    }
  });
};

export const handleToggleBannerBlock = async (id, currentStatus,loadBanners) => {
  const newStatus = currentStatus ? false : true; 
  const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the Banner?`;

  showBlockConfirmation(title, newStatus, async () => {
    try {
      await ADMIN_API.put(`/admin/toggleBlockBanners/${id}`, { status: newStatus });
      loadBanners();
      toast.success(`Banner has been ${newStatus ? 'listed' : 'unlisted'}`);
    } catch (error) {
      console.error('Error blocking Banner:', error);
      toast.error('Failed to update Banner status');
    }
  });
};

export const handleToggleCouponBlock = async (id, currentStatus,loadCoupons) => {
  const newStatus = currentStatus ? false : true; 
  const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the product?`;

  showBlockConfirmation(title, newStatus, async () => {
    try {
      await ADMIN_API.put(`/admin/toggleBlockCoupon/${id}`, { status: newStatus });
      loadCoupons();
      toast.success(`Product has been ${newStatus ? 'listed' : 'unlisted'}`);
    } catch (error) {
      console.error('Error blocking product:', error);
      toast.error('Failed to update product status');
    }
  });
};

export  const handleChangeOrderStatus = async (orderId,selectedStatus,loadOrders) => {
  const newStatus = selectedStatus[orderId];
  if (!newStatus) {
    toast.error("Please select a status before saving.");
    return;
  }

  try {
    const response = await ADMIN_API.post(`/admin/update_order_status`, {
      orderId,
      status: newStatus,
    });

    if (response.status === 200) {
      toast.success("Order status updated successfully.");
      loadOrders();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    toast.error('Failed to update order status.');
  }
};

export const handleToggleCategoriesBlock = async (id, currentStatus,loadCategories) => {
  const newStatus = currentStatus ? false : true; 
  const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the Category?`;

  showBlockConfirmation(title, newStatus, async () => {
    try {
      await ADMIN_API.put(`/admin/toggleBlockCategories/${id}`, { status: newStatus });
      loadCategories();
      toast.success(`Category has been ${newStatus ? 'listed' : 'unlisted'}`);
    } catch (error) {
      console.error('Error blocking Category:', error);
      toast.error('Failed to update Category status');
    }
  });
};

export const handleBlockProductOffers = async (id, currentStatus,loadProductOffers) => {
  const newStatus = currentStatus ? false : true; 
  const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the Offer?`;

  showBlockConfirmation(title, newStatus, async () => {
    try {
      await ADMIN_API.put(`/admin/toggleBlockProductOffers`, { id,status: newStatus });
      loadProductOffers();
      toast.success(`Offer has been ${newStatus ? 'listed' : 'unlisted'}`);
    } catch (error) {
      console.error('Error blocking Offer:', error);
      toast.error('Failed to update Offer status');
    }
  });
};

export const handleBlockCategoryOffers = async (id, currentStatus,loadCategoriesOffers) => {
  const newStatus = currentStatus ? false : true; 
  const title = `Do you want to ${newStatus ? 'List' : 'Unlist'} the Offer?`;

  showBlockConfirmation(title, newStatus, async () => {
    try {
      await ADMIN_API.put(`/admin/toggleBlockCategoryOffers`, { id,status: newStatus });
      loadCategoriesOffers();
      toast.success(`Offer has been ${newStatus ? 'listed' : 'unlisted'}`);
    } catch (error) {
      console.error('Error blocking Offer:', error);
      toast.error('Failed to update Offer status');
    }
  });
};