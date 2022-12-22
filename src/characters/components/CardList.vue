<script setup lang="ts">
import CharacterCard from "@/characters/components/CharacterCard.vue";
import type {Character} from "@/api/gameOfThrones/models/Character";

const props = defineProps<{ characters: Character[] }>();

</script>

<template>
  <div class="character-list">
    <CharacterCard
        v-for="character of props.characters"
        :key="character.id"
        :character="character"
    />
  </div>
</template>


<style scoped>
.character-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.character-list > div {
  flex: 1 1 20%;
  max-width: 250px;
}
</style>