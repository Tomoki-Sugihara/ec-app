import {
   Divider,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
} from '@material-ui/core';
import {
   AddCircle,
   ExitToApp,
   History,
   Person,
   Search,
} from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducks/users/operations';
import { TextInput } from '../UIkit';

const useStyles = makeStyles(theme =>
   createStyles({
      drawer: {
         [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
         },
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
         width: 256,
      },
      searchField: {
         alignItems: 'center',
         display: 'flex',
         marginLeft: 32,
      },
   })
);

const ClosableDrawer = props => {
   const dispatch = useDispatch();
   const classes = useStyles();
   const { container } = props;

   const [keyword, setKeyword] = useState('');
   const inputKeyword = useCallback(
      event => {
         setKeyword(event.target.value);
      },
      [setKeyword]
   );

   const selectMenu = (event, path) => {
      dispatch(push(path));
      props.onClose(event);
   };

   const menus = [
      {
         func: selectMenu,
         label: '商品登録',
         icon: <AddCircle />,
         id: 'register',
         value: '/product/edit',
      },
      {
         func: selectMenu,
         label: '注文履歴',
         icon: <History />,
         id: 'history',
         value: '/order/history',
      },
      {
         func: selectMenu,
         label: 'プロフィール',
         icon: <Person />,
         id: 'profile',
         value: '/user/mypage',
      },
   ];

   return (
      <nav className={classes.drawer}>
         <Drawer
            container={container}
            variant="temporary"
            anchor="right"
            open={props.open}
            onClose={e => props.onClose(e)}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
         >
            <div onClose={e => props.onClose(e)} onKeyDown={e => props.onClose}>
               <div className={classes.searchField}>
                  <TextInput
                     fullWidth={false}
                     label={'キーワードを入力'}
                     multiline={false}
                     onChange={inputKeyword}
                     required={false}
                     rows={1}
                     value={keyword}
                     type={'text'}
                  />
                  <IconButton>
                     <Search />
                  </IconButton>
               </div>
               <Divider />
               <List>
                  {menus.map(menu => (
                     <ListItem
                        button
                        key={menu.id}
                        onClick={e => menu.func(e, menu.value)}
                     >
                        <ListItemIcon>{menu.icon}</ListItemIcon>
                        <ListItemText primary={menu.label} />
                     </ListItem>
                  ))}
                  <ListItem
                     button
                     key="logout"
                     onClick={() => dispatch(signOut())}
                  >
                     <ListItemIcon>
                        <ExitToApp />
                     </ListItemIcon>
                     <ListItemText primary="ログアウト" />
                  </ListItem>
               </List>
            </div>
         </Drawer>
      </nav>
   );
};

export default ClosableDrawer;
