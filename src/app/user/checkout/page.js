"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { fetchAddress, fetchCard, fetchCart, addCard, applyPromo,fetchPromo,placeOrder } from "@/api/apiHandler";
import { useRouter } from "next/navigation";

const cardValidationSchema = Yup.object({
  name: Yup.string().required("Name on card is required"),
  card_number: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry_month: Yup.string()
    .matches(/^(0[1-9]|1[0-2])$/, "Month must be 01-12")
    .required("Expiry month is required"),
  expiry_year: Yup.string()
    .matches(/^\d{2}$/, "Year must be 2 digits")
    .required("Expiry year is required"),
});

export default function CheckoutPage() {
  // Cart and totals
  const router=useRouter();
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [availableVouchers, setAvailableVouchers] = useState([]);


  // Delivery method and address
  const [shippingMethod, setShippingMethod] = useState("Delivery");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressError,setAddressError]=useState("");

  // Payment method and card
  const [paymentMethod, setPaymentMethod] = useState("Cod");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardError,setCardError]=useState("");

  // Add Card Modal
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    getCart();
    getPromoCodes();
  }, []);

  async function getCart() {
    let res = await fetchCart();
    if (res.code === 0) {
      toast.error(res.message);
    } else {
      setCart(res.data);
    }
  }

  async function getAddress() {
    let res = await fetchAddress();
    if (res.code === 0) {
      toast.error(res.message);
    } else {
      setAddresses(res.data.address);
      if (!selectedAddress && res.data.address.length > 0) {
        setSelectedAddress(res.data.address[0].id);
      }
    }
  }

  async function getCard() {
    let res = await fetchCard();
    if (res.code === 0) {
      toast.error(res.message);
    } else {
      setCards(res.data);
      if (!selectedCard && res.data.length > 0) {
        setSelectedCard(res.data[0].id);
      }
    }
  }

  async function getPromoCodes() {
    let res = await fetchPromo();
    if (res.code === 0) {
      toast.error(res.message);
    } else {
      setAvailableVouchers(res.data);
    }
  }

  // Fetch addresses/cards when needed
  useEffect(() => {
    if (shippingMethod === "Delivery") {
      getAddress();
    }
  }, [shippingMethod]);

  useEffect(() => {
    if (paymentMethod === "Card") {
      getCard();
    }
  }, [paymentMethod]);

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - promoDiscount;

  // Promo code handler
  async function applyPromoCode() {
    if (!promoCode) {
      setPromoError("Please enter a promo code");
      setPromoDiscount(0);
      return;
    }
    const res = await applyPromo({promo:promoCode, subTotal:subtotal});
    if (res.code === 1) {
      setPromoDiscount(res.data); // discount should be a flat amount
      setPromoError("");
      toast.success(res.message);
    } else {
      setPromoDiscount(0);
      setPromoCode("");
      setPromoError(res.message || "Invalid promo code");
    }
  }

  async function placeOrderr(){
    if(shippingMethod=='Delivery' && !selectedAddress){
      if(addresses.length==0){
         setAddressError("Please Add New Address to Proceed");
         return;
      }
      setAddressError("Please Select Address to Proceed");
      return;
    }
    if(paymentMethod === "Card" && !selectedCard){
       if(cards.length==0){
         setCardError("Please Add New Card to Proceed");
         return;
      }
      setCardError("Please Select Card to Proceed");
      return;
    }
    let data={shipping_method:shippingMethod,payment_method:paymentMethod,card_id:selectedCard,shipping_address_id:selectedAddress,promo:promoCode};
    let res=await placeOrder(data);
    if(res.code==1){
      toast.success(res.message);
      router.push(`/user/orders/${res.data.order_id}`);
    }else{
      toast.error(res.message);
      router.push(`/order-failure`);
    }
  };

  // --- Add Card Formik ---
  const addCardFormik = useFormik({
    initialValues: {
      name: "",
      card_number: "",
      expiry_month: "",
      expiry_year: "",
    },
    validationSchema: cardValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const data = {
        name: values.name,
        card_number: values.card_number,
        expiry_month: values.expiry_month,
        expiry_year: values.expiry_year,
      };
      let res = await addCard(data);
      if (res.code === 1) {
        toast.success(res.message);
        await getCard();
        setShowAddCard(false);
        resetForm();
      } else {
        toast.error(res.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-8">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 p-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        {cart.length===0 ? (
             <div className="flex flex-col items-center py-16">
            <svg width="96" height="96" fill="none" viewBox="0 0 96 96" className="mb-6">
              <circle cx="48" cy="48" r="46" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
              <path d="M61 61l14 14" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="48" cy="48" r="18" stroke="#3B82F6" strokeWidth="4"/>
            </svg>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Your cart is empty</h2>
            <Link
              href="/user/product"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Go to Shop
            </Link>
          </div>
          ) : (<>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <div className="divide-y divide-blue-100">
              {cart.map((item) => (
  <div key={item.product_combination_id} className="flex items-center gap-6 py-4">
    <img
      src={item.cover_image}
      alt={item.name}
      className="w-16 h-16 object-cover rounded-lg border border-blue-100"
    />
    <div className="flex-1 min-w-0">
      <div className="text-md font-semibold text-gray-800 truncate">{item.name}</div>
      {/* Color & Size row */}
      {(item.color || item.size) && (
        <div className="flex items-center gap-4 mt-0.5 text-xs">
          {item.color && (
            <div className="flex items-center gap-1">
              <span
                className="inline-block w-3 h-3 rounded-full border border-gray-200 mr-1"
                style={{ backgroundColor: item.color.code || item.color.hex || item.color }}
                title={item.color.name || item.color}
              />
              <span className="text-gray-500">
                {item.color.name || item.color}
              </span>
            </div>
          )}
          {item.size && (
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Size:</span>
              <span className="bg-gray-100 py-0.5 px-1.5 rounded text-xs text-gray-800 font-medium">
                {item.size.name || item.size}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-blue-600 font-bold text-md mt-1">₹{item.price}</div>
    </div>
    <div className="text-lg text-gray-800">x{item.quantity}</div>
    <div className="text-lg font-bold text-gray-800">
      ₹{(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
))}

            </div>
          )}
        </div>

      



        {/* Delivery Method */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Delivery Method</h2>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg border font-medium transition ${
                shippingMethod === "Delivery"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => setShippingMethod("Delivery")}
            >
              Delivery
            </button>
            <button
              className={`px-4 py-2 rounded-lg border font-medium transition ${
                shippingMethod === "Pickup"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => setShippingMethod("Pickup")}
            >
              Pickup
            </button>
          </div>
          {shippingMethod === "Delivery" && (
            <div>
              {addresses.length>0 && 
              (<div>
              <label className="font-medium text-gray-700 mr-2">Select Address:</label>
              <select
                value={selectedAddress || ""}
                onChange={(e) => setSelectedAddress(Number(e.target.value))}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
              >
                {addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.first_name} {address.last_name}, {address.address}, {address.city}, {address.state}, {address.zip} ({address.phone})
                  </option>
                ))}
              </select>
              </div>)}

              <div className="mt-2">
                <Link
                  href="/user//address/add"
                  className="text-blue-600 hover:underline text-sm"
                >
                  + Add new address
                </Link>
              </div>
            </div>
          )}
          {addressError && <div className="text-red-500 mb-2">{addressError}</div>}
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg border font-medium transition ${
                paymentMethod === "Cod"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => setPaymentMethod("Cod")}
            >
              Cash on Delivery
            </button>
            <button
              className={`px-4 py-2 rounded-lg border font-medium transition ${
                paymentMethod === "Card"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
              onClick={() => setPaymentMethod("Card")}
            >
              Card
            </button>
          </div>
          {paymentMethod === "Card" && (
            <div>
              {cards.length > 0 && (
                <>
                  <label className="font-medium text-gray-700 mr-2">Select Card:</label>
                  <select
                    value={selectedCard || ""}
                    onChange={(e) => setSelectedCard(Number(e.target.value))}
                    className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                  >
                    {cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.name} • **** **** **** {card.card_number.slice(-4)} • {card.expiry_month}/{card.expiry_year}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <div className="mt-2">
                <button
                  type="button"
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => {setShowAddCard(true);
                    setCardError("");
                  }}
                >
                  + Add new card
                </button>
              </div>
              {/* Inline Add Card Form */}
              {showAddCard && (
                <div className="mt-4 p-4 rounded-xl border border-blue-200 bg-white/80">
                  <form onSubmit={addCardFormik.handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Cardholder Name"
                        className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                          addCardFormik.touched.name && addCardFormik.errors.name ? "border-red-400" : ""
                        }`}
                        value={addCardFormik.values.name}
                        onChange={addCardFormik.handleChange}
                        onBlur={addCardFormik.handleBlur}
                        disabled={addCardFormik.isSubmitting}
                      />
                      {addCardFormik.touched.name && addCardFormik.errors.name && (
                        <p className="text-red-500 text-xs mt-1">{addCardFormik.errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="card_number"
                        maxLength={16}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                          addCardFormik.touched.card_number && addCardFormik.errors.card_number ? "border-red-400" : ""
                        }`}
                        value={addCardFormik.values.card_number}
                        onChange={addCardFormik.handleChange}
                        onBlur={addCardFormik.handleBlur}
                        disabled={addCardFormik.isSubmitting}
                        inputMode="numeric"
                        pattern="\d*"
                      />
                      {addCardFormik.touched.card_number && addCardFormik.errors.card_number && (
                        <p className="text-red-500 text-xs mt-1">{addCardFormik.errors.card_number}</p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Month<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiry_month"
                          maxLength={2}
                          placeholder="MM"
                          className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                            addCardFormik.touched.expiry_month && addCardFormik.errors.expiry_month ? "border-red-400" : ""
                          }`}
                          value={addCardFormik.values.expiry_month}
                          onChange={addCardFormik.handleChange}
                          onBlur={addCardFormik.handleBlur}
                          disabled={addCardFormik.isSubmitting}
                          inputMode="numeric"
                          pattern="\d*"
                        />
                        {addCardFormik.touched.expiry_month && addCardFormik.errors.expiry_month && (
                          <p className="text-red-500 text-xs mt-1">{addCardFormik.errors.expiry_month}</p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Year<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiry_year"
                          maxLength={2}
                          placeholder="YY"
                          className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                            addCardFormik.touched.expiry_year && addCardFormik.errors.expiry_year ? "border-red-400" : ""
                          }`}
                          value={addCardFormik.values.expiry_year}
                          onChange={addCardFormik.handleChange}
                          onBlur={addCardFormik.handleBlur}
                          disabled={addCardFormik.isSubmitting}
                          inputMode="numeric"
                          pattern="\d*"
                        />
                        {addCardFormik.touched.expiry_year && addCardFormik.errors.expiry_year && (
                          <p className="text-red-500 text-xs mt-1">{addCardFormik.errors.expiry_year}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={addCardFormik.isSubmitting}
                        className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {addCardFormik.isSubmitting ? "Saving..." : "Save Card"}
                      </button>
                      <button
                        type="button"
                        className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                        onClick={() => setShowAddCard(false)}
                        disabled={addCardFormik.isSubmitting}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {cardError && <div className="text-red-500 mb-2">{cardError}</div>}
        </div>

        {/* Promotion Section */}
        <div className="mb-8">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">Promotion</h2>
  <div className="flex gap-2 mb-2">
    <input
      type="text"
      placeholder="Enter promo code"
      value={promoCode}
      onChange={(e) => setPromoCode(e.target.value)}
      className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
    />
    <button
      onClick={applyPromoCode}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
    >
      Apply
    </button>
  </div>
  {promoError && <div className="text-red-500 mb-2">{promoError}</div>}
  {promoDiscount > 0 && (
    <div className="text-green-600 mb-2">
      Promo applied: -₹{promoDiscount}
    </div>
  )}

  {/* Vouchers Listing */}
  {availableVouchers.length > 0 && (
    <div className="mt-4">
      <div className="font-medium text-gray-700 mb-2">Available Vouchers:</div>
      <div className="flex flex-wrap gap-3">
        {availableVouchers.map((voucher) => {
          const minOrder = parseFloat(voucher.min_order_value || "0");
          const isEligible = subtotal >= minOrder;
          return (
            <button
              key={voucher.id}
              type="button"
              onClick={() => {if(isEligible){
                setPromoCode(voucher.code);
                setPromoError("");
              } }}
              disabled={!isEligible}
              className={`px-4 py-2 rounded-lg border font-medium transition
                ${isEligible
                  ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
              title={
                isEligible
                  ? `Get ${voucher.discount}% off (max ₹${voucher.max_discount})`
                  : `Min order ₹${voucher.min_order_value} required`
              }
            >
              {voucher.code}
              <span className="ml-2 text-xs">
                {voucher.discount}% off, max ₹{voucher.max_discount}
              </span>
              {!isEligible && (
                <span className="block text-xs text-gray-400 mt-1">
                  Min order ₹{voucher.min_order_value}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  )}
</div>

        {/* Cart Summary & Place Order */}
        <div className="border-t border-blue-100 pt-6 mt-8">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700">₹{subtotal.toFixed(2)}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Promo Discount</span>
                <span>-₹{promoDiscount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-700">Total</span>
              <span className="text-gray-700">₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={placeOrderr}
            className="w-full mt-4 px-8 py-3 rounded-xl font-semibold text-lg shadow transition bg-blue-600 text-white hover:bg-blue-700"
            disabled={cart.length === 0}
          >
            Place Order
          </button>
        </div>
      
          </>)}</div>
    </div>
  );
}
