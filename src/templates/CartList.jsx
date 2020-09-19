import { List, makeStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrayButton, PrimaryButton } from '../components/UIkit';
import { getProductsInCart } from '../reducks/users/selectors';
import CartListItem from './CartListItem';

const useStyles = makeStyles({
   root: {
      margin: '0 auto',
      maxWidth: 512,
      width: '100%',
   },
});

const CartList = () => {
   const classes = useStyles();

   const selector = useSelector(state => state);
   const dispatch = useDispatch();
   const productsInCart = getProductsInCart(selector);

   const goToOrder = useCallback(() => {
      dispatch(push('/order/confirm'));
   }, []);

   const backToHome = useCallback(() => {
      dispatch(push('/'));
   }, []);

   return (
      <section className="c-section-wrapin">
         <h2 className="u-text__headline">ショッピングカート</h2>
         <List className={classes.root}>
            {productsInCart.length > 0 &&
               productsInCart.map(product => (
                  <CartListItem key={product.cartId} product={product} />
               ))}
         </List>
         <div className="module-spacer--medium" />
         <div className="p-grid__column">
            <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
            <div className="module-spacer--small" />
            <GrayButton label={'ショッピングを続ける'} onClick={backToHome} />
         </div>
      </section>
   );
};

export default CartList;
