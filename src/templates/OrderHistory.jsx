import { List, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderHistoryItem from '../components/products/OrderHistoryItem';
import { fetchOrdersHistory } from '../reducks/products/operations';
import {
   getOrdersHistory,
   getProductsInCart,
} from '../reducks/users/selectors';

const useStyles = makeStyles(theme => ({
   orderList: {
      background: theme.palette.grey['100'],
      margin: '0 auto',
      padding: 32,
      [theme.breakpoints.down('sm')]: {
         width: '100%',
      },
      [theme.breakpoints.up('md')]: {
         width: 768,
      },
   },
}));

const OrderHistory = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const selector = useSelector(state => state);
   // const orders = getProductsInCart(selector);
   const orders = getOrdersHistory(selector);

   useEffect(() => {
      dispatch(fetchOrdersHistory());
   }, []);

   return (
      <section className="c-section-wrapin">
         <List className={classes.orderList}>
            {orders.length > 0 &&
               orders.map(order => (
                  <OrderHistoryItem order={order} key={order.id} />
               ))}
         </List>
      </section>
   );
};

export default OrderHistory;
