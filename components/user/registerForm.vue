<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkpassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validateName = (rule, value, callback) => {
      let rule2 = /^1[3-9][0-9]{9}$/;
      if (rule2.test(value)) {
        callback();
      } else {
        callback(new Error("输入手机号码格式有误"));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        password: "",
        checkpassword: "",
        username: "",
        captcha: "",
        nickname: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkpassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if (!this.form.username) {
        alert("手机号码不能为空");
      } else if (this.form.username.length !== 11) {
        alert("手机号码输入不正确");
      } else {
        this.$store.dispatch("user/sendCaptcha", this.form.username).then(res => {
            if (res) {
              this.$message.success("验证码发送成功，000000");
            }
          });
      }
    },

    // 注册
    handleRegSubmit() {
      //    console.log(this.form)
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 注册提交
          // 解构
          const { checkpassword, ...props } = this.form;
          this.$store.dispatch('user/userRegister',props).then(res=>{
              if(res){
                   this.$message.success('注册成功，跳转登录')
                   
              }
          })
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>