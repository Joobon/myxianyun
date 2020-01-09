import {Message} from "element-ui";

// export default function({$axios, redirect}){
//     $axios.onError(err => {
//         console.log(err);
//         const {statusCode, message} = err.response.data;
        
//         // 还未使用
//         if(statusCode === 401 || statusCode === 403){
//             Message.warning({message: "请先登录"});
//             redirect("/user/login");
//         }

//         if(statusCode === 400){
//             Message.warning({message});
//         }
//     })
// }
export default function(nuxt){
    nuxt.$axios.onError(err => {
        console.log(err);
        const {statusCode, message} = err.response.data;
        
        // 还未使用
        if(statusCode === 401 || statusCode === 403){
            Message.warning('请先登录，即将跳转登录页面');
            nuxt.redirect("/user/login");
        }

        if(statusCode === 400){
            Message.warning({message});
        }
    })
}