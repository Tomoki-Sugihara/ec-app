import { Badge, IconButton } from '@material-ui/core';
import {
   FavoriteBorder,
   Menu as MenuIcon,
   ShoppingCart,
} from '@material-ui/icons';
import React from 'react';

const HeaderMenus = (props) => {
   return (
      <>
         <IconButton>
            <Badge badgeContent="3" color="secondary">
               <ShoppingCart />
            </Badge>
         </IconButton>
         <IconButton>
            <FavoriteBorder />
         </IconButton>
         <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
            <MenuIcon />
         </IconButton>
      </>
   );
};

export default HeaderMenus;
