import {
   Divider,
   IconButton,
   ListItem,
   ListItemAvatar,
   ListItemText,
   makeStyles,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { GrayButton } from '../components/UIkit';
import { db } from '../firebase';
import { getUserId } from '../reducks/users/selectors';

const useStyles = makeStyles(theme => ({
   list: {
      height: 128,
   },
   image: {
      objectFit: 'cover',
      margin: 16,
      height: 96,
      width: 96,
   },
   text: {
      width: '100%',
   },
}));

const CartListItem = props => {
   const classes = useStyles();

   const selector = useSelector(state => state);

   const image = props.product.images[0].path;
   const name = props.product.name;
   const size = props.product.size;
   const price = props.product.price.toLocaleString();

   const removeProductFromCart = id => {
      const userId = getUserId(selector);
      return db
         .collection('users')
         .doc(userId)
         .collection('cart')
         .doc(id)
         .delete();
   };

   return (
      <>
         <ListItem className={classes.list}>
            <ListItemAvatar>
               <img className={classes.image} src={image} alt="商品画像" />
            </ListItemAvatar>
            <div className={classes.text}>
               <ListItemText primary={name} secondary={'サイズ:' + size} />
               <ListItemText primary={'¥' + price} />
            </div>
            <IconButton
               onClick={() => removeProductFromCart(props.product.cartId)}
            >
               <DeleteIcon />
            </IconButton>
         </ListItem>
         <Divider />
      </>
   );
};

export default CartListItem;
