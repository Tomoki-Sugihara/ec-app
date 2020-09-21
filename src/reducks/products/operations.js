import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase';
import { deleteProductAction, fetchProductsAction } from '../products/actions';
import { fetchOrderHistoryAction, fetchOrdersHistoryAction } from '../users/actions';

const productsRef = db.collection('products');

export const saveProduct = (
   id,
   name,
   description,
   category,
   gender,
   price,
   images,
   sizes
) => {
   return async dispatch => {
      const timestamp = FirebaseTimestamp.now();

      const data = {
         category,
         description,
         gender,
         images,
         name,
         price: parseInt(price, 10),
         updated_at: timestamp,
         sizes,
      };
      if (id === '') {
         const ref = productsRef.doc();
         id = ref.id;
         data.id = id;
         data.created_at = timestamp;
      }

      return productsRef
         .doc(id)
         .set(data, { merge: true })
         .then(() => {
            dispatch(push('/'));
         })
         .catch(error => {
            throw new Error(error);
         });
   };
};

export const fetchProducts = () => {
   return async dispatch => {
      productsRef
         .orderBy('updated_at', 'desc')
         .get()
         .then(snapshots => {
            const productList = [];
            snapshots.forEach(snapshot => {
               const product = snapshot.data();
               productList.push(product);
            });
            dispatch(fetchProductsAction(productList));
         });
   };
};

export const deleteProduct = id => {
   return async (dispatch, getState) => {
      productsRef
         .doc(id)
         .delete()
         .then(() => {
            const prevProducts = getState().products.list;
            const newProducts = prevProducts.filter(
               product => product.id !== id
            );
            dispatch(deleteProductAction(newProducts));
         });
   };
};

export const orderProduct = (productsInCart, price) => {
   return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const userRef = db.collection('users').doc(uid);
      const timestamp = FirebaseTimestamp.now();

      let products = {},
         soldOutProducts = [];

      const batch = db.batch();

      for (const product of productsInCart) {
         const snapshot = await productsRef.doc(product.productId).get();
         const sizes = snapshot.data().sizes;

         const updateSizes = sizes.map(size => {
            if (size.size === product.size) {
               if (size.quantity === 0) {
                  soldOutProducts.push(product.name);
                  return size;
               }
               return {
                  size: size.size,
                  quantity: size.quantity - 1,
               };
            } else {
               return size;
            }
         });

         products[product.productId] = {
            id: product.productId,
            images: product.images,
            name: product.name,
            price: product.price,
            size: product.size,
         };

         batch.update(productsRef.doc(product.productId), {
            sizes: updateSizes,
         });

         batch.delete(userRef.collection('cart').doc(product.cartId));
      }

      if (soldOutProducts.length > 0) {
         const errorMessage =
            soldOutProducts.length > 1
               ? soldOutProducts.join('と')
               : soldOutProducts[0];
         alert(
            '大変申し訳ございません。' +
               errorMessage +
               'が在庫切れになったため、注文処理を中断しました。'
         );
         return false;
      } else {
         batch
            .commit()
            .then(() => {
               const orderRef = userRef.collection('orders').doc();
               const date = timestamp.toDate();
               const shippingDate = FirebaseTimestamp.fromDate(
                  new Date(date.setDate(date.getDate() + 3))
               );

               const history = {
                  amount: price,
                  created_at: timestamp,
                  id: orderRef.id,
                  products: products,
                  shipping_date: shippingDate,
                  updated_at: timestamp,
               };

               orderRef.set(history);
            })
            .catch(() => {
               alert('注文処理に失敗しました。');
               return false;
            });
      }
   };
};

export const fetchOrdersHistory = () => {
   return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const list = [];

      db.collection('users')
         .doc(uid)
         .collection('orders')
         .orderBy('updated_at', 'desc')
         .get()
         .then(snapshots => {
            snapshots.forEach(snapshot => {
               const data = snapshot.data();
               list.push(data);
            });
            dispatch(fetchOrdersHistoryAction(list));
         });
   };
};
