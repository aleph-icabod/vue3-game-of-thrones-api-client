<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import useCharacters from "@/characters/composables/useCharacters";

const props = defineProps<{ title: string, visible: boolean }>();

const {isLoading,hasError,errorMessage,characters,count }=useCharacters();
</script>

<template>
  <h2>{{ props.title}} - {{ (count)}}</h2>

  <div class="page-content">
    <p v-if="isLoading">Loading</p>
    <p v-if="hasError">{{ errorMessage }}</p>

    <CardList
        :characters="characters"
        v-if="!isLoading"/>
  </div>

</template>


<style scoped>

</style>