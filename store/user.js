export const state=()=>({
    userInfo:{}
});
// 同步操作
export const mutations={
    userInfo(state,data){
        state.userInfo=data
    }
};
// 异步操作
export const actions={
    // 登录
    login(store,data){
       return this.$axios({
            url:'/accounts/login',
            method:'post',
            data
        }).then(res=>{
            store.commit('userInfo',res.data)
            return true
        })
    },
    // 发送验证码
    sendCaptcha(store,data){
        return this.$axios({
            url:"/captchas",
            method:'post',
            data:{
                tel:data
            }
        })
    },
    // 注册
    userRegister(store,data){
        return  this.$axios({
            url: '/accounts/register',
            method: "post",
            data
        }).then(res=>{
            console.log(res)
            setTimeout(() => {
                this.currentTab==0
                }, 1000);
            return true
         })
    }
}