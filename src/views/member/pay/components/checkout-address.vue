<template>
    <div class="checkout-address">
        <div class="text">
            <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
            <ul v-if="showAddress">
                <li><span>收<i />货<i />人：</span>{{ showAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}</li>
                <li><span>收货地址：</span>{{ showAddress.fullLocation.replace(/ /g, '') }}{{ showAddress.address }}</li>
            </ul>
            <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
        </div>
        <div class="action">
            <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
            <XtxButton @click="openAddressEdit({})" class="btn">添加地址</XtxButton>
        </div>
    </div>
    <!-- 对话框组件-切换收货地址 -->
    <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
        <div @click="selectedAddress = item" :class="{ active: selectedAddress && selectedAddress.id === item.id }" class="text item"
            v-for="item in list" :key="item.id">
            <ul>
                <li><span>收<i />货<i />人：</span>{{ item.receiver }}</li>
                <li><span>联系方式：</span>{{ item.contact.replace(/^(d{3})\d{4}(\d{4})$/, '$1****$2') }}</li>
                <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
            </ul>
        </div>
        <template #footer>
            <XtxButton @click="visibleDialog = false" type="gray" style="margin-right: 20px;">取消</XtxButton>
            <XtxButton @click="confirmAddressFn" type="primary">确认</XtxButton>
        </template>
    </XtxDialog>
    <!-- 收货地址添加编辑组件 -->
    <AddressEdit @on-success="successHandler" ref="addressEditCom" />
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './address-edit.vue'
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => { }
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const showAddress = ref(null)
    const defaultAddress = props.list.find(item => item.isDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      if (props.list.length) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }

    emit('change', showAddress.value && showAddress.value.id)

    // 显示隐藏
    const visibleDialog = ref(false)
    // 记录当前选中的地址ID
    const selectedAddress = ref(null)
    const confirmAddressFn = () => {
      showAddress.value = selectedAddress.value
      emit('change', selectedAddress.value?.id)
      visibleDialog.value = false
    }
    const openDialog = () => {
      selectedAddress.value = null
      visibleDialog.value = true
    }
    const addressEditCom = ref(null)
    const openAddressEdit = (address) => {
      addressEditCom.value.open(address)
    }

    const successHandler = (formData) => {
      const address = props.list.find(item => item.id === formData.id)
      if (address) {
        for (const key in address) {
          address[key] = formData[key]
        }
      } else {
        const jsonStr = JSON.stringify(formData)
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(jsonStr))
      }
    }

    return {
      showAddress,
      visibleDialog,
      selectedAddress,
      confirmAddressFn,
      openDialog,
      openAddressEdit,
      addressEditCom,
      successHandler
    }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        &.item {
            border: 1px solid #f5f5f5;
            margin-bottom: 10px;
            cursor: pointer;

            &.active,
            &:hover {
                border-color: @xtxColor;
                background: lighten(@xtxColor, 50%);
            }

            >ul {
                padding: 10px;
                font-size: 14px;
                line-height: 30px;
            }
        }
    }
}

.checkout-address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }

        >ul {
            flex: 1;
            padding: 20px;

            li {
                line-height: 30px;

                span {
                    color: #999;
                    margin-right: 5px;

                    >i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }

        >a {
            color: @xtxColor;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }

    .action {
        width: 420px;
        text-align: center;

        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}</style>
