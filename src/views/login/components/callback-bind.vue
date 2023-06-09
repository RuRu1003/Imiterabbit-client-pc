<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{ errors }" autocomplete="off" class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，欢迎 {{ nickname }}，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{ err: errors.mobile }" v-model="form.mobile" name="mobile" class="input" type="text"
          placeholder="绑定的手机号" />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{ err: errors.code }" v-model="form.code" name="code" class="input" type="text" placeholder="短信验证码" />
        <span @click="send()" class="code">
          {{ time === 0 || time === -1 ? '发送验证码' : `${time}秒后发送` }}
        </span>
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.code }}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc'
import { ref, reactive, onUnmounted } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const nickname = ref('null')
    const avatar = ref('null')
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
        avatar.value = res.data.figureurl_1
        nickname.value = res.data.nickname
      })
    }

    // 表单数据对象
    const form = reactive({
      mobile: null,
      code: null
    })
    // 校验规则对象
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }

    // 发送短信验证码
    const formCom = ref(null)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })
    // 发送短信
    const send = async () => {
      try {
        const valid = mySchema.mobile(form.mobile)
        if (valid === true) {
          // 通过,
          console.log('formCom', formCom.value)
          if (time.value === 0 || time.value === -1) {
            await userQQBindCode(form.mobile)
            Message({ type: 'success', text: '发送成功' })
            time.value = 60
            resume()
          }
        } else {
          // 失败
          formCom.value.setFieldError('mobile', valid)
        }
      } catch (e) {
        // 失败提示
        if (e.response.data) {
          Message({ type: 'error', text: e.response.data.message || '登录失败' })
        }
      }
    }

    // 立即绑定
    const store = useStore()
    const router = useRouter()
    const submit = async () => {
      const valid = formCom.value.validate()
      if (valid) {
        userQQBindLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          // 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeCart').then(() => {
            // 进行跳转
            router.push(store.state.user.redirectUrl)
            // 成功消息提示
            Message({ type: 'success', text: 'QQ绑定成功' })
          })
        }).catch(e => {
          Message({ type: 'error', text: '绑定失败' })
        })
      }
    }

    return { nickname, avatar, form, mySchema, send, time, formCom, submit }
  }
}
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>
