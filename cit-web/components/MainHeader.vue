<template>
  <div class="main-header-container">
    <h1 class="main-header-title">{{ title }}</h1>
    <h6 class="main-header-subtitle">Census Subdivision: {{ subtitle }}</h6>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: null,
      type: String,
    },
    subtitle: {
      default: null,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.main-header-container {
  background-color: #e5e8ec;
  padding: 4em;
}
.main-header-title {
  font-size: 32px;
  color: #212529;
}

.main-header-subtitle {
  font-size: 20px;
  color: #495057;
  font-weight: 500;
}
</style>
