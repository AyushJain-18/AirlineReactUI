import firebase ,{auth} from './firebase-setup';

const googleProvide = new firebase.auth.GoogleAuthProvider();
googleProvide.setCustomParameters({prompt:'select_account'});


export const gmailLogin = async() => {
    try {
        const {user} =  await auth.signInWithPopup(googleProvide)
        return user;
      }catch(error){
          console.log('error.message', error.message)
          return new Error(error.message);
    }
}

export const  signOut = async()=>{
    try{
        await auth.signOut();
        return "SignOut Success"
    } catch(error){
        throw new Error('Error occured in sign out');
    }
}

