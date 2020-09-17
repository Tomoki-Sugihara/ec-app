import {
   Card,
   CardContent,
   CardMedia,
   IconButton,
   Menu,
   MenuItem,
   Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NoImage from '../../assets/img/src/no_image.png';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { MoreVert } from '@material-ui/icons';
import { deleteProduct } from '../../reducks/products/operations';

const useStyles = makeStyles(theme => ({
   root: {
      [theme.breakpoints.down('sm')]: {
         margin: 8,
         width: 'calc(50% - 16px)',
      },
      [theme.breakpoints.up('md')]: {
         margin: 16,
         width: 'calc(33.3333% - 32px)',
      },
   },
   content: {
      display: 'flex',
      padding: '16 8',
      textAlign: 'left',
      '&:last-child': {
         paddingBottom: 16,
      },
   },
   icon: {
      marginRight: 0,
      marginLeft: 'auto',
   },
   media: {
      height: 0,
      paddingTop: '100%',
   },
   price: {
      color: theme.palette.secondary.dark,
      fontSize: 16,
   },
   productName: {
      boxOrient: 'vertical',
      display: '-webkit-box',
      fontSize: 14,
      lineHeight: '18px',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
         height: 36,
         lineClamp: 2,
      },
      [theme.breakpoints.up('md')]: {
         height: 18,
         lineClamp: 1,
      },
   },
}));

const ProductCard = props => {
   const classes = useStyles();

   const dispatch = useDispatch();
   const [anchorEL, setAnchorEL] = useState(null);

   const handleClick = event => {
      setAnchorEL(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEL(null);
   };

   const images = props.images.length > 0 ? props.images : [NoImage];
   // const price = props.price.toLocaleString();

   return (
      <Card className={classes.root}>
         <CardMedia
            image={images[0].path}
            className={classes.media}
            onClick={() => dispatch(push(`/product/${props.id}`))}
         />
         <CardContent className={classes.content}>
            <div onClick={() => dispatch(push(`/product/${props.id}`))}>
               <Typography
                  component="p"
                  color="textSecondary"
                  className={classes.name}
               >
                  {props.name}
               </Typography>
               <Typography component="p" className={classes.price}>
                  ¥{props.price}
               </Typography>
            </div>
            <IconButton onClick={handleClick}>
               <MoreVert />
            </IconButton>
            <Menu
               anchorEl={anchorEL}
               keepMounted
               open={Boolean(anchorEL)}
               onClose={handleClose}
            >
               <MenuItem
                  onClick={() => {
                     dispatch(push(`/product/edit/${props.id}`));
                     handleClose();
                  }}
               >
                  編集する
               </MenuItem>
               <MenuItem
                  onClick={() => {
                     dispatch(deleteProduct(props.id));
                     handleClose();
                  }}
               >
                  削除する
               </MenuItem>
            </Menu>
         </CardContent>
      </Card>
   );
};

export default ProductCard;
