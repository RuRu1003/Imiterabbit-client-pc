<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/"></RouterLink>
            </h1>
            <!-- 使用头部导航组件 -->
            <AppHeaderNav />
            <div class="right">
                <RouterLink to="/">品牌</RouterLink>
                <RouterLink to="/">专题</RouterLink>
            </div>
            <!-- 使用头部购物车组件 -->
            <AppHeaderCart />
        </div>
    </header>
</template>

<script>
import AppHeaderNav from './app-header-nav.vue'
import AppHeaderCart from './app-header-cart.vue'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderNav,
    AppHeaderCart
  }
}
</script>

<style scoped lang='less'>
.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
        .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid @xtxColor;

        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;

            &:hover {
                color: @xtxColor;
            }
        }
    }
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url(../assets/images/logo.png) no-repeat center 40px / contain;
        }
    }

    .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 32px;

        .icon-search {
            font-size: 18px;
            margin-left: 5px;
        }

        input {
            width: 140px;
            padding-left: 5px;
            color: #666;
        }
    }
}
</style>
