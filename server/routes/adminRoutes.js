import express from 'express';
import {  add_product, toggleBlockProduct, delete_product, get_all_products, get_edit_product, update_product } from '../controllers/admin/productsControllers.js';
import { get_all_categories, toggleBlockCategories } from '../controllers/admin/categoriesControllers.js';
import { add_brands, get_all_brands } from '../controllers/admin/brandsControllers.js';
import { get_all_coupons } from '../controllers/admin/couponControllers.js';
import { get_all_users, toggleBlock } from '../controllers/admin/usersControllers.js';
import upload from '../middlewares/multer.js'
import { add_coupon, toggleBlockCoupon } from '../controllers/user/couponsControllers.js';
import { add_categories_offer, add_product_offer, toggleBlockCategoryOffers, toggleBlockProductOffers, get_all_categories_offer, get_all_product_offer } from '../controllers/admin/offerControllers.js';
import { best_selling_brands, best_selling_categories, best_sellings_products, get_all_orders, get_sales_statistics, sales_report, update_order_status } from '../controllers/admin/ordersControllers.js';
import { add_banners, get_all_banners, toggleBlockBanners } from '../controllers/admin/bannerControllers.js';
import { adminAuth } from '../middlewares/adminMiddleware.js';
import { adminLogin } from '../controllers/admin/adminControllers.js';
import { toggleBlockBrands } from '../controllers/user/brandControllers.js';


const router = express.Router()

//=================================[ Admin Auth ]===============================//

router.post('/login',adminLogin)

//=================================[ Banner ]===============================//

router.post('/add_banners',upload.single('image'), add_banners);

// router.get('get_edit_banners/:id',adminAuth,get_edit_banners)

router.put("/toggleBlockBanners/:id",toggleBlockBanners);

// router.put('update_banners',adminAuth,upload.single('image'),update_banners)

router.get('/get_all_banners', get_all_banners)

//=================================[ Statistics ]===============================//

router.get('/best_sellings_products',best_sellings_products)

router.get('/best_selling_categories',best_selling_categories)

router.get('/best_selling_brands',best_selling_brands)

//=================================[ Products Offers ]===============================//

router.post('/add_product_offer',adminAuth,add_product_offer)

router.get('/get_all_product_offer',get_all_product_offer)

router.put('/toggleBlockProductOffers',toggleBlockProductOffers)

//=================================[ Categories Offers ]===============================//

router.post('/add_categories_offer',add_categories_offer)

router.get('/get_all_categories_offer',get_all_categories_offer)

router.put('/toggleBlockCategoryOffers',toggleBlockCategoryOffers)

//=================================[ Orders ]===============================//

router.get('/get_all_orders',get_all_orders)

router.post('/update_order_status',update_order_status)

//=================================[ DashBoard ]===============================//

router.post('/sales_report',sales_report)

router.get('/get_sales_statistics',get_sales_statistics)

//=================================[ Products ]===============================//

router.post('/add_product',upload.array('images', 5),add_product);

router.get('/get_edit_product/:id', get_edit_product);

router.put('/update_product/:id',upload.array('images', 5),update_product)

router.delete('/delete_product/:id',delete_product)

router.get('/get_all_products',get_all_products)

router.put('/toggleBlockProduct',toggleBlockProduct)

//=================================[ Users ]===============================//

router.get('/get_all_users',get_all_users)

router.put('/toggleBlock',toggleBlock)

//=================================[ Categories ]===============================//

router.get('/get_all_categories', get_all_categories)

router.put('/toggleBlockCategories/:id',toggleBlockCategories)

//=================================[ Coupons ]===============================//

router.get('/get_all_coupons',get_all_coupons)

router.post('/add_coupon',add_coupon)

router.put("/toggleBlockCoupon/:id",toggleBlockCoupon);

//=================================[ Brands ]===============================//

router.post('/add_brands',upload.single('image'), add_brands);

// router.get('get_edit_brands/:id',adminAuth,get_edit_brands)

router.put("/toggleBlockBrands/:id",toggleBlockBrands);

// router.put('update_brands',adminAuth,upload.single('image'),update_brands)

router.get('/get_all_brands', get_all_brands)

//===========================================================================//

export default router;
