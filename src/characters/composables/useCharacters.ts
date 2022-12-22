import {computed, ref} from "vue";
import type {Character} from "@/api/gameOfThrones/models/Character";
import gameOfThronesApi from "@/api/gameOfThrones/GameOfThronesApi";
import {useQuery} from "@tanstack/vue-query";
import axios, {AxiosError} from "axios";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);


const getCharacters = async (): Promise<Character[]> => {
    if (characters.value.length > 0) {
        return characters.value;
    }

    const {data} = await gameOfThronesApi.get<Character[]>('/Characters')
    return data
}

const loadedCharacters = (data: Character[] | string) => {

    if (typeof data === 'string') {
        loadCharactersFailed('unexpected response from api');
        return
    }

    characters.value = data;
    isLoading.value = false;
    hasError.value = false;
    errorMessage.value = null;
};

const loadCharactersFailed = (error: string) => {
    characters.value = [];
    isLoading.value = false;
    hasError.value = true;
    errorMessage.value = error;
};

const handleError = (err: AxiosError | string) => {
    if (axios.isAxiosError(err)) {
        loadCharactersFailed(err.message)
        return
    }
    loadCharactersFailed(`unexpected api response: ${err}`)

}

const
    useCharacters = () => {


        const {isLoading} = useQuery(
            ['characters'],
            getCharacters,
            {
                onSuccess: loadedCharacters,
                onError: handleError
            }
        );

        return {
            characters,
            isLoading,
            hasError,
            errorMessage,
            count: computed(() => characters.value.length),
        };
    };

export default useCharacters;