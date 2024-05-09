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
  height: 100%;
  padding: 30px 30px 10px;
}
</style>
