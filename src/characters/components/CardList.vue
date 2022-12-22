<script setup lang="ts">
import {useCharacters} from "@/characters/composables/useCharacters";


const {characters, isLoading, errorMessage} = useCharacters();

</script>

<template>
  <p v-if="isLoading">Loading</p>
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <ul v-if="!isLoading">
    <li v-for="character of characters" :key="character.id">
      {{ character.fullName }} {{ character.family }}
    </li>
  </ul>
</template>


<style scoped>

</style>