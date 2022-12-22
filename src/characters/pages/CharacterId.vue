<script setup lang="ts">
import {useRoute} from "vue-router";
import {charactersStore} from "@/store/characters.store";
import {useQuery} from "@tanstack/vue-query";
import type {Character} from "@/api/gameOfThrones/models/Character";
import type {Ref} from "vue";

const route = useRoute();

const props = defineProps<{ title: string, visible: boolean }>();
const params = route.params as { id: string }


const resp = useQuery(
    ['characters', params.id],
    () => charactersStore.getCharacterByID(params.id),
);

const character: Ref<Character | undefined> = resp.data;


</script>

<template>
  <h2 v-if="charactersStore.ids.isLoading">Loading</h2>


  <div v-if="!charactersStore.ids.isLoading" class="page-content">
    <h2 v-if="charactersStore.ids.hasError">{{ charactersStore.ids.errorMessage }}</h2>

    <div class="character" v-if="character">
      <img :src="character.imageUrl" :alt="character.image" class="character-photo">

      <div class="character-info">
        <h2>{{ character.fullName }}</h2>
        <p>{{ character.title }}</p>
        <p>{{ character.family }}</p>
      </div>
    </div>


  </div>

</template>

<style scoped>
.character {
  display: flex;
}

.character-photo{
  flex: 1 1 200px;
  max-width: 300px;
}

.character-info{
  margin-left: 1em;
}
</style>