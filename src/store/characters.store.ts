import type {Character} from "@/api/gameOfThrones/models/Character";
import {reactive} from "vue";

export interface CharactersState {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    startLoadingCharacters: () => void;
    loadedCharacters: (data: Character[]) => void;
    loadCharactersFailed: (error: string) => void;
};


export const charactersStore = reactive<CharactersState>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: [],
    },
    startLoadingCharacters() {
    },
    loadedCharacters(data: Character[] | string) {

        if (typeof data==='string') {
            this.loadCharactersFailed('unexpected response from api');
            return
        }

        this.characters = {
            list: data,
            isLoading: false,
            hasError: false,
            count: data.length,
            errorMessage: null,
        };
    },
    loadCharactersFailed(error: string) {
        this.characters = {
            list: [],
            isLoading: false,
            hasError: true,
            count: 0,
            errorMessage: error,
        };
    },

});
