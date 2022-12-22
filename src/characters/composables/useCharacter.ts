import {computed, ref} from "vue";
import type {Character} from "@/api/gameOfThrones/models/Character";
import gameOfThronesApi, {aSongOfIceAndFireApi} from "@/api/gameOfThrones/GameOfThronesApi";
import {useQuery} from "@tanstack/vue-query";
import type {CharacterDetails} from "@/api/gameOfThrones/models/CharacterDetails";
import axios, {AxiosError} from "axios";


const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const charactersSet = ref<Map<string, Character>>(new Map<string, Character>());


const getCharacter = async (id: string): Promise<Character> => {
    if (charactersSet.value.get(id)) {
        return charactersSet.value.get(id)!;
    }

    try {
        const {data} = await gameOfThronesApi.get<Character>(`/Characters/${id}`)
        const {data: details} = await aSongOfIceAndFireApi.get<CharacterDetails[]>(`/characters?name=${data.fullName}`)
        data.details = details;
    return data;
    }catch (e){
        return Promise.reject(e)
    }
};

const loadCharacterFailed = (error: string) => {
    hasError.value = true;
    errorMessage.value = error;
};

const handleError = (err: AxiosError | string) => {
    if (axios.isAxiosError(err)) {
        loadCharacterFailed(err.message)
        return
    }
    loadCharacterFailed(`unexpected api response: ${err}`)

}

const setCharacter = (id: string, character: Character) => {
    hasError.value = false;
    errorMessage.value = null;
    charactersSet.value.set(id, character);
}

const useCharacter = (id: string) => {

    const {isLoading} = useQuery(
        ['characters', id],
        () => getCharacter(id),
        {
            onSuccess: (character) => setCharacter(id, character),
            onError: handleError,
        }
    );

    return {
        character: computed(() => charactersSet.value.get(id)),
        isLoading,
        hasError,
        errorMessage,
    };
};


export default useCharacter;
