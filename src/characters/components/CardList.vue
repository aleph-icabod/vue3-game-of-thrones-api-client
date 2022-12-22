<script setup lang="ts">
import gameOfThronesApi from "@/api/gameOfThrones/GameOfThronesApi";
import type {Character} from "@/api/gameOfThrones/models/Character";


const {data: characters} = await gameOfThronesApi.get<Character[]>('/Characters');

</script>

<template>
  <ul>
    <li v-for="character of characters" :key="character.id">
      {{ character.fullName }} {{ character.family }}
    </li>
  </ul>
</template>


<style scoped>

</style>