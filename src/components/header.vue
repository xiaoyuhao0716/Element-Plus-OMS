<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <el-icon v-if="!sidebar.collapse"><Fold /></el-icon>
      <el-icon v-else><Expand  /></el-icon>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username.email }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="loginout" @click="signOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { useSidebarStore } from "../store/sidebar";
import { useUserDataStore } from "../store/userData.js";

import { useRouter } from "vue-router";

export default {
  setup() {
    const username = useUserDataStore();
    const sidebar = useSidebarStore();

    // 侧边栏折叠
    const collapseChage = () => {
      sidebar.handleCollapse();
    };

    // 用户名下拉菜单选择事件
    const router = useRouter();

    const handleCommand = (command) => {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        router.push("/login");
      } else if (command == "user") {
        router.push("/user");
      }
    };

    //退出
    const signOut = () => {
      username.deleteUserData();
    };

    return {
      sidebar,
      collapseChage,
      handleCommand,
      username,
      signOut,
    };
  },
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
