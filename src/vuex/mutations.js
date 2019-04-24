export const userStatus = (state,user) => {
    if(user){
        state.currentUser = user;
        state.isLogin = true;
        state.authority = user.authority;
    }else if(user == null){
        sessionStorage.setItem("userName",null)
        sessionStorage.setItem("authority",0)
        state.currentUser = null;
        state.isLogin = false;
        state.token = "";
    }
}
