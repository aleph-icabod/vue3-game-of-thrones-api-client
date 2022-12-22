<script setup lang="ts">

import type {RouteLink} from "@/router/link-routes";

interface Props {
  showIcon?: boolean,
  title?: string,
  links: RouteLink[],
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  links: () => [],
});
</script>

<template>

  <nav>
    <RouterLink to="/home" class="main-link">
      <img v-if="props.showIcon" src="@/assets/logo.svg" height="25" width="25" alt="Vue"/>
      <span>{{ props.title || '' }}</span>

    </RouterLink>


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

a:hover{
  transition: all .5s;
  background: none;
  border-bottom: 1px solid whitesmoke;
}

.main-link{
  display: flex;
}
</style>