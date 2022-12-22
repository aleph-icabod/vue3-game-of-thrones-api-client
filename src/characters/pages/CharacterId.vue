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
        <p><b>Main title: </b>{{ character.title }}</p>
        <p><b>Born: </b>{{ character.details[0]?.born }}</p>
        <p><b>Culture: </b>{{ character.details[0]?.culture }}</p>
        <p><b>Father: </b>{{ character.details[0]?.father }}</p>
        <p><b>Mother: </b>{{ character.details[0]?.mother }}</p>
        <p><b>Gender: </b>{{ character.details[0]?.gender }}</p>
        <p><b>Spouse: </b>{{ character.details[0]?.spouse }}</p>

      </div>

      <div class="character-details">

        <div class="character-detail" v-for="detail of character.details">
          <h4>Titles</h4>
          <ul>
            <li v-for="title of detail.titles">{{ title }}</li>
          </ul>
          <h4>Aliases</h4>
          <ul>
            <li v-for="alias of detail.aliases">{{ alias }}</li>
          </ul>

          <h4>Played by</h4>
          <ul>
            <li v-for="actor of detail.playedBy">{{ actor }}</li>
          </ul>

          <h4>Allegiances</h4>
          <ul>
            <li v-for="allegiance of detail.allegiances">{{ allegiance }}</li>
          </ul>
          <h4>Seasons</h4>
          <ul>
            <li v-for="season of detail.tvSeries">{{ season }}</li>
          </ul>
          <h4>Books</h4>
          <ul>
            <li v-for="book of detail.books">{{ book }}</li>
          </ul>
        </div>

      </div>
    </div>


  </div>

</template>

<style scoped>
.character {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.character-photo {
  flex: 1 1 200px;
  max-width: 300px;
}

.character-info {
  margin-left: 1em;
}

.character-details {
  flex: 1 1 100%;
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.character-detail {
  margin: .5em;
  padding: 1em;
  box-shadow: 0px 0px 1px 0 rgba(255, 255, 255, .2);
}

.character-detail h4 {
  font-weight: bold;
}

.character-detail li {
  list-style: none;
}
</style>