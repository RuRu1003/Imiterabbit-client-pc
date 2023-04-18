<template>
    <!-- 顶部通栏 -->
    <AppNavbar />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 内容容器 -->
    <div class="app-body">
        <!-- 二级路由 -->
        <RouterView />
    </div>
    <!-- 底部组件 -->
    <AppFooter />
</template>
<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'XtxLayout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped lang="less">
.app-body {
  min-height: 400px;
}
</style>
