import { AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/img/icons/logo.png';
import { getIsSignedIn } from '../../reducks/users/selectors';
import ClosableDrawer from './ClosableDrawer';
import HeaderMenus from './HeaderMenus';
const useStyles = makeStyles(() =>
   createStyles({
      root: {
         flexGrow: 1,
      },
      menuBar: {
         backgroundColor: '#fff',
         color: '#444',
      },
      toolbar: {
         margin: '0 auto',
         maxWidth: 1024,
         width: '100%',
      },
      iconButtons: {
         margin: '0 0 0 auto',
      },
   })
);
const Header = () => {
   const classes = useStyles();

   const dispatch = useDispatch();
   const selector = useSelector(state => state);
   const isSignedIn = getIsSignedIn(selector);

   const [open, setOpen] = useState(false);
   const handleDrawerToggle = useCallback(
      event => {
         if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
         ) {
            return;
         }
         setOpen(!open);
      },
      [open, setOpen]
   );

   return (
      <div className={classes.root}>
         <AppBar position="fixed" className={classes.menuBar}>
            <Toolbar className={classes.toolbar}>
               <img
                  src={logo}
                  alt="logo"
                  width="128px"
                  onClick={() => {
                     dispatch(push('/'));
                  }}
               />
               {isSignedIn && (
                  <div className={classes.iconButtons}>
                     <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                  </div>
               )}
            </Toolbar>
         </AppBar>
         <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      </div>
   );
};

export default Header;
