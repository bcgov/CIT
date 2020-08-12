<template>
  <v-app light class="h-100">
    <v-app-bar class="main-navigation" fixed height="66" color="primary">
      <v-toolbar-title class="navigation-wrapper">
        <nuxt-link class="main-title d-block" to="/"
          >Community Information Tool 2.0</nuxt-link
        >
        <CommunityList></CommunityList>
      </v-toolbar-title>
    </v-app-bar>
    <div class="fixed-content">
      <nuxt />
    </div>
    <!--<div class="fixed-footer">
      <v-footer color="primary" height="66"></v-footer>
    </div>-->
  </v-app>
</template>

<script>
export default {
  mounted() {
    const element = document.documentElement
    element.classList.add('fixed-layout')
  },
}
</script>
<style lang="scss">
.fixed-layout {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
.fixed-content {
  margin-top: 66px;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}

.v-application .primary.main-navigation {
  border-bottom: 2px solid #fcba19;
  border-color: #fcba19 !important;
}

.navigation-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: unset;
  white-space: normal;
}

.main-title {
  color: white !important;
  text-decoration: none;
}
</style>
