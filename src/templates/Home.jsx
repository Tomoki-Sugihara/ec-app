import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { signOut } from '../reducks/users/operations';

const Home = () => {
   const dispatch = useDispatch();
   const selector = useSelector(state => state);
   // const uid = getUserId;
   const uid = getUserId(selector);
   const username = getUserName(selector);
   return (
      <div>
         <h2>Home</h2>
         <p>ユーザーid：{uid}</p>
         <p>ユーザー名：{username}</p>
         <button
            onClick={() => {
               dispatch(push('/signup'));
            }}
         >
            サインアップ
         </button>
         <button
            onClick={() => {
               dispatch(signOut());
            }}
         >
            サインアウト
         </button>
      </div>
   );
};

export default Home;
