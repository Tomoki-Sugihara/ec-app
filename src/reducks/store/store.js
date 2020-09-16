import {
   createStore as reduxCreateStore,
   combineReducers,
   applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';

export default function crateStore(history) {
   return reduxCreateStore(
      combineReducers({
         router: connectRouter(history),
         users: UsersReducer,
         products: ProductsReducer,
      }),
      applyMiddleware(routerMiddleware(history), thunk)
   );
}
// export default crateStore = () => {
//    return reduxCreateStore(
//       combineReducers({users: UsersReducer})
//    )
// }
