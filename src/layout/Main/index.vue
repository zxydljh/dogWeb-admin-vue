<script setup>

</script>
<script>
export default {
  name: 'MainArea'
}
</script>
<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<style scoped>
.app-main {
  height: calc(100% - 60px);
  overflow-y: auto;
}
</style>
