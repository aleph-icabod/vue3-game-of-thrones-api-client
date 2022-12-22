<script setup lang="ts">

import type {Character} from "@/api/gameOfThrones/models/Character";
import {toRef} from "vue";
import {useRouter} from "vue-router";

const props = defineProps<{ character: Character }>();
const character = toRef(props, 'character');

const router = useRouter();

const viewDetails = () => {
  router.push(`by/${props.character.id}`);
}

</script>


<template>
  <div class="character-card" @click="viewDetails">
    <div class="character-image">
      <img :src="character.imageUrl" :alt="character.fullName">
    </div>
    <div class="character-description">
      <h3 class="character-name">{{ character.fullName }}</h3>
      <p class="character-title">{{ character.title }}</p>
    </div>
  </div>
</template>


<style scoped>
.character-card {
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  justify-content: space-between;
  cursor: pointer;
  transition: all .25s;
}

.character-card:hover {
  border-radius: .5rem;
  box-shadow: 0 2px .25rem rgba(255, 255, 255, .5);
}

.character-description {
  text-align: center;
}

.character-image {
  border-radius: .5rem .5rem 0 0;
  width: 100%;
  height: 80%;
  box-shadow: 0 2px .25rem rgba(255, 255, 255, .1);
  overflow: clip;
  transition: all .25s;
}

.character-image:hover {
  box-shadow: none;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>