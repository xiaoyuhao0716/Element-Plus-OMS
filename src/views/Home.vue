<template>
  <div class="home">
    <vHeader />
    <vSidebar />
    <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useSidebarStore } from "../store/sidebar";

import vHeader from "../components/header";
import vSidebar from "../components/sidebar";
import vTags from "../components/Tags.vue";

export default {
  name: "Home",

  components: {
    vHeader,
    vSidebar,
    vTags,
  },

  setup() {
    const sidebar = useSidebarStore();

    return {
      sidebar,
    };
  },

  created() {},
};
</script>
