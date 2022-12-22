
<script setup lang="ts">

import Navbar from "@/shared/components/Navbar.vue";
import {routeLinks} from "@/router/link-routes";
</script>

<template>
  <div class="wrapper">
    <header>
      <Navbar
        title="Game of Thrones"
        :links="routeLinks"
      />
    </header>

    <main>
      <RouterView />
    </main>

  </div>
</template>

<style scoped>

.wrapper{
  display: flex;
  flex-direction: column;
}

</style>
