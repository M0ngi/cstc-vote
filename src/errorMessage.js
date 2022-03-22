export const errorMessage = (error)=>{
    switch(error.code){
      case "auth/user-not-found":{
        return "Account doesn't exist!";
      }
      case "auth/invalid-email":{
        return "Invalid email!";
      }
      case "auth/wrong-password":{
        return "The provided password is incorrect!";
      }
      case "auth/network-request-failed":{
        return "Network error, please try again.";
      }
      case "auth/too-many-requests":{
        return "Network problem, please try again in few minutes";
      }
      case "auth/user-disabled":{
        return "Account disabled! contact an administrator!"
      }
    }
    return error.message;
  }