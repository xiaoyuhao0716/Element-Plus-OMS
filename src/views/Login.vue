<template>
  <div>
    <div class="ms-login">
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()" >登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";

import { apiLogin } from "../apis";
import { useUserDataStore } from "../store/userData.js";

export default {
  setup() {
    const router = useRouter();

    const userData = useUserDataStore();

    const param = reactive({
      username: "admin",
      password: "123",
    });

    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          apiLogin(param)
            .then((result) => {
              userData.setUserData(result.data);
              ElMessage.success("登录成功");
              router.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          ElMessage.error("重新输入账号密码");
          return false;
        }
      });
    };

    return {
      param,
      rules,
      login,
      submitForm,
    };
  },
};
</script>

<style scoped>
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
</style>
