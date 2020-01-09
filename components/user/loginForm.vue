<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
       var validateName=(rules,value,callback)=>{
           let rlue=/^1[3-9][0-9]{9}$/
           if(rlue.test(value)){
                callback()
           }else{
               callback(new Error('手机号码格式有误'))
           }
       };
    
        return {
            // 表单数据
            form: {
                username:'13800138000',
                password:'123456'
            },
            // 表单规则
            rules: {
                username:[
                    {validator: validateName,trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码', trigger:'blur'}
                ]
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
        //    console.log(this.form)
           this.$refs.form.validate(valid=>{
            //    console.log(valid);
            if(valid){
                this.$store.dispatch('user/login', this.form).then(res=>{
                    this.$message.success('登陆成功，跳转首页')
                })
            setTimeout(() => {
                this.$router.back()
            }, 1000);

            }
               
           })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>