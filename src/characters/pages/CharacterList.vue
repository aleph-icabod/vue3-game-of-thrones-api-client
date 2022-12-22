<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import {useQuery} from "@tanstack/vue-query";
import gameOfThronesApi from "@/api/gameOfThrones/GameOfThronesApi";
import type {Character} from "@/api/gameOfThrones/models/Character";
import {charactersStore} from "@/store/characters.store";
import axios from "axios";

const props = defineProps<{ title: string, visible: boolean }>();


useQuery(
    ['characters'],
    async () => {
      if (charactersStore.characters.count > 0) {
        return charactersStore.characters.list;
      }

      const {data} = await gameOfThronesApi.get<Character[]>('/Characters')
      return data
    },
    {
      onSuccess(d: Character[]) {
        charactersStore.loadedCharacters(d);
      },
      onError(err) {
        if (axios.isAxiosError(err)) {
          charactersStore.loadCharactersFailed(err.message)
          return
        }
        charactersStore.loadCharactersFailed(`unexpected api response: ${err}`)
      }
    }
);


</script>

<template>
  <h2>{{ props.title }}</h2>

  <div class="page-content">
    <p v-if="charactersStore.characters.isLoading">Loading</p>
    <p v-if="charactersStore.characters.hasError">{{ charactersStore.characters.errorMessage }}</p>

    <CardList
        :characters="charactersStore.characters.list"
        v-if="!charactersStore.characters.isLoading"/>
  </div>

</template>


<style scoped>

</style>