import express from 'express'
import { get_all_products, get_related_products, new_arrivals, products_details } from '../controllers/user/productsControllers.js'
import { get_all_brands } from '../controllers/user/brandControllers.js'
import { get_all_banners } from '../controllers/user/bannerControllers.js'
import { get_all_categories } from '../controllers/user/categoriesControllers.js'

const router = express.Router()

//=================================[ Users Authentications ]===============================//

// router.post('/register', registerUser)

// router.post('/login',loginUser)

// router.post('/verify', verifyOTP)

// router.post('/resendOtp', resendOtp)

// router.post('/handle_google_auth',handle_google_auth)

//=================================[ Products ]===============================//

router.get('/get_all_products',get_all_products)

router.get('/products_details/:id',products_details);

router.get('/get_related_products/:id', get_related_products)

router.get('/new_arrivals',new_arrivals)

//=================================[ Brands ]===============================//

router.get('/get_all_brands',get_all_brands)

//=================================[ Banners ]===============================//

router.get('/get_all_banners',get_all_banners)

//=================================[ Categories ]===============================//

router.get('/get_all_categories',get_all_categories)


// router.post('/add_wallet_amount',userAuth,add_wallet_amount);

// router.post('/get_user_wallet',userAuth,get_user_wallet)

// router.get('/handle_successful_payment/:id',userAuth,handle_successful_payment)

//=================================[ Coupons ]===============================//

// router.get('get_all_coupons',userAuth,get_all_coupons)

//=================================[ Orders ]===============================//

// router.get('/get_user_orders/:id',userAuth,get_user_orders)

// router.get('/get_user_order_detail/:id',userAuth,get_user_order_detail)

// router.post('/place_order',userAuth,place_order)

// router.get('/order_cancel/:id',userAuth,order_cancel)

// router.get('/order_return/:id',userAuth,order_return)

// router.get('/handle_failed_payment/:id',userAuth,handle_failed_payment)

// //=================================[ Cart ]===============================//

// router.post('/remove_cart_product',userAuth,remove_cart_product)

// router.post('/update_cart_qty',userAuth,update_cart_qty)

// router.get('/get_user_cart/:id',userAuth,get_user_cart)

// router.post('/add_to_cart',userAuth, add_to_cart);

// //=================================[ Wishlist ]===============================//

// router.post('/remove_wishlist_product',userAuth,remove_wishlist_product)

// router.post('/add_to_wishlist',userAuth,add_to_wishlist)

// router.get('/get_user_wishlist/:id',get_user_wishlist)


// //=================================[ Reset Passwords ]===============================//

// router.get('/forgotPassword/:email',forgotPassword)

// router.post('/verifyForgotPassword', verifyForgotPassword); 

// router.post('/resendOtpForgotPassword', resendOtpForgotPassword)

// router.post('/updatePassword',updatePassword)

// //=================================[ Address ]===============================//

// router.post('/add_address',userAuth,add_address)

// router.get('/get_current_address/:id', userAuth,get_current_address)

// router.put('/update_address', userAuth,update_address)

// router.post('/get_edit_address',userAuth,get_edit_address)

// //=================================[ Profile ]===============================//

// router.put('/update_profile', update_profile)
// //=================================[ Current Users ]===============================//

// router.get('/get_current_user/:id',userAuth,get_current_user)

//=============================================================================//

export default router;









