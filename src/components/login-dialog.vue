<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row justify-center items-center">
      <input class="px-2 py-2 mx-2 border border-gray-400 rounded" type="email" placeholder="Email" v-model="email" />
      <input class="px-2 py-2 mx-2 border border-gray-400 rounded" type="text" placeholder="Verification Code" v-model="verificationCode" />
      <button class="px-2 py-2 mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" @click="sendVerificationCode">
        Send Verification Code
      </button>
    </div>
    <div class="flex flex-row justify-center items-center">
      <button class="px-2 py-2 mx-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded" @click="confirmVerificationCode">
        Confirm
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      verificationCode: ''
    };
  },
  methods: {
    sendVerificationCode() {
      // TODO: 发送验证码到邮箱
    },
    confirmVerificationCode() {
      // TODO: 验证邮箱验证码是否正确
    }
  }
};
</script>

<style>

</style>