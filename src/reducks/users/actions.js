export const SIGN_IN = 'SIGN_IN';
export const signInAction = userState => {
   return {
      type: SIGN_IN,
      payload: {
         isSignedIn: true,
         uid: userState.uid,
         role: userState.role,
         username: userState.username,
      },
   };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
   return {
      type: SIGN_OUT,
   };
};

export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART';
export const fetchProductsInCartAction = products => {
   return {
      type: FETCH_PRODUCTS_IN_CART,
      payload: products,
   };
};

export const FETCH_ORDERS_PRODUCTS = 'FETCH_ORDERS_PRODUCTS';
export const fetchOrdersHistoryAction = products => {
   return {
      type: FETCH_ORDERS_PRODUCTS,
      payload: products,
   };
};
