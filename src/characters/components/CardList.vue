<script setup lang="ts">
import {useCharacters} from "@/characters/composables/useCharacters";
import {useQuery} from "@tanstack/vue-query";
import gameOfThronesApi from "@/api/gameOfThrones/GameOfThronesApi";
import CharacterCard from "@/characters/components/CharacterCard.vue";


//const {characters, isLoading, errorMessage} = useCharacters();

const {data: characters, isLoading, error: errorMessage} = useQuery(
    ['characters'],
    async () => {
      const {data} = await gameOfThronesApi.get('/Characters')
      return data
    },
    {
      cacheTime: 1000 * 10,
      refetchOnReconnect: 'always',
    }
);

</script>

<template>
  <p v-if="isLoading">Loading</p>
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <div class="character-list" v-if="!isLoading">
    <CharacterCard
        v-for="character of characters"
        :key="character.id"
        :character="character"
    />
  </div>
</template>


<style scoped>
.character-list{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.character-list>div{
  flex: 1 1 20%;
  max-width: 250px;
}
</style>