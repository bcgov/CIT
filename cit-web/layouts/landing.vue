<template>
  <v-app light class="h-100">
    <v-app-bar class="main-navigation" fixed height="66" color="primary">
      <v-toolbar-title>
        <nuxt-link class="main-title d-block" to="/"
          >Community Information Tool</nuxt-link
        >
      </v-toolbar-title>
    </v-app-bar>
    <div class="content">
      <nuxt />
    </div>
    <div class="footer">
      <v-footer color="primary" height="66"></v-footer>
    </div>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  flex-direction: column;
}
.content {
  margin-top: 66px;
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}

.v-application .primary.main-navigation {
  border-bottom: 2px solid #fcba19;
  border-color: #fcba19 !important;
}

.main-title {
  color: white !important;
  text-decoration: none;
}
</style>
