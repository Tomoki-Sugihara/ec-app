import React from 'react';
import './assets/reset.css';
import './assets/style.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { signInAction } from './reducks/users/actions';

import Router from './Router';

function App() {
   // const dispatch = useDispatch();
   // const selector = useSelector(state => state);
   // console.log(selector.users);
   return (
      <>
         <main className="c-main">
            <Router />
         </main>
      </>
   );
}

export default App;
