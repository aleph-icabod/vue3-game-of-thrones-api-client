import {onMounted, ref} from "vue";
import type {Character} from "@/api/gameOfThrones/models/Character";
import gameOfThronesApi from "@/api/gameOfThrones/GameOfThronesApi";
import {isAxiosError} from "axios";


const characters = ref<Character[]>([]);
const isLoading = ref(true);
const errorMessage = ref<string>();

export const useCharactersOld = () => {

    onMounted(async () => {
        await loadCharacters();
    })
    const loadCharacters = async () => {
        if (characters.value.length !== 0) {
            return;
        }

        isLoading.value = true;

        try {
            const data = await gameOfThronesApi.get<Character[]>('/Characters');
            characters.value = data.data;

        } catch (e) {
            if (isAxiosError(e)) {
                errorMessage.value = e.message;
            } else {
                errorMessage.value = JSON.stringify(e);
            }
        } finally {
            isLoading.value = false
        }
    }


    return {
        characters,
        isLoading,
        errorMessage
    }
}