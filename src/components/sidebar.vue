<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon><component :is="item.icon"></component></el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useSidebarStore } from "../store/sidebar";
import { useRoute } from "vue-router";

import { apiSidebarData } from "../apis/index.js";
import { useSidebarDataStore } from "../store/sidebarData.js";

export default {
  setup() {
    const items = ref([]);
    const sidebarData = useSidebarDataStore();

    if (sidebarData.sidebarListData.length > 1) {
      items.value = sidebarData.sidebarListData;
    } else {
      apiSidebarData()
        .then((res) => {
          sidebarData.setSidebarListData(res.data.sidebarData);
          items.value = res.data.sidebarData;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    const sidebar = useSidebarStore();

    return {
      items,
      onRoutes,
      sidebar,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
