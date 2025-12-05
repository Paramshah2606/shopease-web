import { secureAxios } from "./api_func";
import { secureFetch } from "./api_func";
const baseurl=process.env.NEXT_PUBLIC_APP_URL_LOCAL;

export async function signup(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/signup`,"POST",data);
}

export async function signupVerification(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/signup_verification`,"POST",data);
}

export async function signupUpload(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/signup_updateImage`,"POST",data);
}

export async function signin(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/login`,"POST",data);
}

export async function resendCode(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/resend_code`,"POST",data);
}

export async function logOut() {
  return secureAxios(`${baseurl}/api/v1/user/auth/logout`,"GET");
}

export async function forgotPassword(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/forgot_password`,"POST",data);
}

export async function forgotPasswordVerification(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/password_verification`,"POST",data);
}

export async function forgotPasswordChange(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/password_change`,"POST",data);
}

export async function deleteAccount() {
  return secureAxios(`${baseurl}/api/v1/user/auth/delete_account`,"DELETE");
}

export async function changePassword(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/reset_password`,"POST",data);
}

export async function uploadImage(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/upload_image`,"POST",data);
}

export async function fetchCollection(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_collections`,"POST",data);
}

export async function fetchCategory(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_category`,"GET",data);
}

export async function fetchSubCategory(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_sub_category`,"POST",data);
}

export async function fetchProduct(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_products`,"POST",data);
}

export async function fetchProductDetail(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/product_detail`,"POST",data);
}

export async function fetchTag() {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_tags`,"GET");
}

export async function fetchBrand(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_brands`,"POST",data);
}

export async function manageCart(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/manage_cart`,"POST",data);
}

export async function fetchCart() {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_cart`,"GET");
}

export async function fetchProductInCart(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/product_in_cart`,"POST",data);
}

export async function fetchAddress(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_address`,"POST",data);
}

export async function fetchCard() {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_card`,"GET");
}

export async function addCard(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/add_card`,"POST",data);
}

export async function addAddress(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/add_address`,"POST",data);
}

export async function deleteAddress(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/delete_address`,"DELETE",data);
}

export async function editAddress(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/edit_address`,"PUT",data);
}

export async function fetchPromo() {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_promocode`,"GET");
}

export async function applyPromo(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/apply_promocode`,"POST",data);
}

export async function placeOrder(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/place_order`,"POST",data);
}

export async function fetchOrderSummary(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_order_summary`,"POST",data);
}

export async function fetchUserOrders(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_user_order`,"POST",data);
}

export async function manageWishlist(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/manage_wishlist`,"POST",data);
}

export async function fetchWishlist() {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_wishlist`,"GET");
}

export async function getSuggestion(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fashion_advisor`,"POST",data);
}

export async function fetchUserDetail() {
  return secureAxios(`${baseurl}/api/v1/user/auth/fetch_user_detail`,"GET");
}

export async function editProfile(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/edit_profile`,"PATCH",data);
}

export async function updatePhoneEmail(data) {
  return secureAxios(`${baseurl}/api/v1/user/auth/update_phone_email`,"POST",data);
}

export async function fetchBlog(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/fetch_blogs`,"POST",data);
}

export async function fetchBlogDetail(data) {
  return secureAxios(`${baseurl}/api/v1/user/home/blog_detail`,"POST",data);
}





export async function manageGoogleLogin() {
  return secureAxios(`${baseurl}/api/v1/user/auth/google`,"GET");
}