<template>
  <input type="checkbox" id="my-modal-6" class="modal-toggle" />
  <div class="modal modal-bottom sm:modal-middle">
    <main class="flex flex-row border rounded-md bg-slate-100">
      <section class="basis-32 grow-0 border-b">
        <div v-for="item of settings" class="setting-item h-10 hover:bg-slate-200">
          <span>{{ item.title }}</span>
        </div>
      </section>
      <section class="grow border-l p-4">
        <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        <div class="modal-action">
          <label for="my-modal-6" class="btn">Yay!</label>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
const settings = [
  {
    icon: '',
    title: '搜索框布局'
  },
  {
    icon: '',
    title: '壁纸'
  }
]
</script>

<style lang="less">
.setting-item {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  text-indent: 12px;
  // border-radius: 12px;

}

</style>