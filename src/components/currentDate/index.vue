<script>
export default {
  name: 'CurrentDate',
  data () {
    return {
      currentDate: ''
    }
  },
  mounted () {
    this.updateCurrentDate()
  },
  methods: {
    updateCurrentDate () {
      const now = new Date()
      const year = String(now.getFullYear())
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      this.currentDate = `${year}.${month}.${day}`
    }
  }
}
</script>

<template>
  <span class="current-time">{{ currentDate }}</span>
</template>

<style scoped>
.current-time {
  margin-left: 10px;
  font-size: 14px;
}
</style>
