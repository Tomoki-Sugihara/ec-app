import { Badge, IconButton } from '@material-ui/core';
import {
   FavoriteBorder,
   Menu as MenuIcon,
   ShoppingCart,
} from '@material-ui/icons';
import React from 'react';

const HeaderMenus = () => {
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
         <IconButton>
            <MenuIcon />
         </IconButton>
      </>
   );
};

export default HeaderMenus;
