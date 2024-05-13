<script setup>

</script>
<script>
export default {
  name: 'ToyDataView',
  data () {
    return {
      startNumber: '12',
      stopNumber: '10'
    }
  }
}
</script>

<template>
  <div class="small-view-container">
    <div class="view-name">
      玩具总览
    </div>
    <div class="view-data-container">
      <div class="view-data">
        <span>起售</span>
        <span>{{ startNumber }}</span>
      </div>
      <div class="view-data">
        <span>停售</span>
        <span>{{ stopNumber }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small-view-container {
  width: 248px;
  margin-bottom: 60px;
  background-color: #f1f1f1;
}

.view-data-container {
  font-size: 18px;
  color: #606266;
  display: flex;
  flex-direction: row;
}

.view-data {
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  margin-bottom: 18px;
  align-items: center;
}

.view-data span {
  margin-bottom: 4px;
}
</style>
