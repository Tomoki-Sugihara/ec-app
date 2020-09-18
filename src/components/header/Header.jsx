import { AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/img/icons/logo.png';
import { getIsSignedIn } from '../../reducks/users/selectors';
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
                     <HeaderMenus />
                  </div>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
};

export default Header;
