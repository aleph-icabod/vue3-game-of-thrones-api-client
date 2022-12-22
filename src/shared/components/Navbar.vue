<script setup lang="ts">

import type {RouteLink} from "@/router/link-routes";

interface Props {
  title?: string,
  links: RouteLink[],
}

const props = defineProps<Props>();
</script>

<template>

  <nav>
    <img src="@/assets/logo.svg" height="25" width="25" alt="Vue"/>
    <span>{{ props.title }}</span>


    <RouterLink
        :to="link.path"
        :key="link.name"
        v-for="link of props.links">{{ link.title }}
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 1em;
  text-align: center;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
}

img {
  margin-right: .5rem;
}

span {
  margin-right: 1rem;
}

a {
  margin-right: .5rem;
}
</style>