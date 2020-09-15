import {
   createStore as reduxCreateStore,
   combineReducers,
   applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { UsersReducer } from '../users/reducers';

export default function crateStore(history) {
   return reduxCreateStore(
      combineReducers({
         router: connectRouter(history),
         users: UsersReducer,
      }),
      applyMiddleware(routerMiddleware(history))
   );
}
// export default crateStore = () => {
//    return reduxCreateStore(
//       combineReducers({users: UsersReducer})
//    )
// }
