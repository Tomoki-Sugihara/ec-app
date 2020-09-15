import { signInAction, signOutAction } from './actions';
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';

export const listenAuthState = () => {
   return async dispatch => {
      return auth.onAuthStateChanged(user => {
         if (user) {
            const uid = user.uid;

            db.collection('users')
               .doc(uid)
               .get()
               .then(snapshot => {
                  const data = snapshot.data();
                  dispatch(
                     signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid,
                        username: data.username,
                     })
                  );
                  dispatch(push('/'));
               });
         } else {
            dispatch(push('/signin'));
         }
      });
   };
};

export const resetPassword = (email) => {
   return async (dispatch) => {
      if (email === "") {
         return false
      } else {
         auth.sendPasswordResetEmail(email)
         .then(() => {
            alert('入力されたアドレスにパスワードリセット用のメールを送信しました')
            dispatch(push('/signin'))
         }).catch(() => {
            alert('パスワードリセットに失敗しました。通信環境の良いところで再度、お試しください。')
         })
      }

   }
}

export const signUp = (username, email, password, confirmPassword) => {
   return async dispatch => {
      //validation
      if (
         username === '' ||
         email === '' ||
         password === '' ||
         confirmPassword === ''
      ) {
         alert('必須項目が未入力です');
         return false;
      }
      if (password !== confirmPassword) {
         alert('パスワードが一致しません。もう一度お試しください。');
         return false;
      }

      return auth
         .createUserWithEmailAndPassword(email, password)
         .then(result => {
            const user = result.user;

            if (user) {
               const uid = user.uid;
               const timestamp = FirebaseTimestamp.now();

               const userInitialData = {
                  created_at: timestamp,
                  email,
                  role: 'customer',
                  uid,
                  updated_at: timestamp,
                  username,
               };

               db.collection('users')
                  .doc(uid)
                  .set(userInitialData)
                  .then(() => {
                     dispatch(push('/'));
                  });
            }
         });
   };
};

export const signIn = (email, password) => {
   return async dispatch => {
      //validation
      if (email === '' || password === '') {
         alert('必須項目が未入力です');
         return false;
      }

      return auth.signInWithEmailAndPassword(email, password).then(result => {
         const user = result.user;

         if (user) {
            const uid = user.uid;

            db.collection('users')
               .doc(uid)
               .get()
               .then(snapshot => {
                  const data = snapshot.data();

                  dispatch(
                     signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid,
                        username: data.username,
                     })
                  );

                  dispatch(push('/'));
               });
         }
      });
   };
};

export const signOut = () => {
   return async dispatch => {
      auth.signOut().then(() => {
         dispatch(signOutAction())
         dispatch(push('/signin'));
      });
   };
};
