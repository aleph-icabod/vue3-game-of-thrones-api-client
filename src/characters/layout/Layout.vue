<script setup lang="ts">

import type {RouteLink} from "@/router/link-routes";
import Navbar from "@/shared/components/Navbar.vue";
import {charactersRoute} from "@/characters/router";

const links: RouteLink[] = charactersRoute.children!.filter(r => {
  return (r.props as { visible: boolean }).visible
}).map(route => {
  return {
    title: (route.props as { title: string, visible: boolean })?.title,
    name: route.name as string,
    path: route.path,
  }
});

</script>

<template>
  <Navbar
      :links="links"
      :showIcon="false"
  >
  </Navbar>

  <RouterView/>
</template>

<style scoped>

</style>