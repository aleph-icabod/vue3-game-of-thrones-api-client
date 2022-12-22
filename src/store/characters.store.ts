import type {Character} from "@/api/gameOfThrones/models/Character";
import {reactive} from "vue";
import gameOfThronesApi from "@/api/gameOfThrones/GameOfThronesApi";
import axios from "axios";

export interface CharactersState {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
        list: {
            [id: string]: Character,
        }
    }

    startLoadingCharacters: () => void;
    loadedCharacters: (data: Character[]) => void;
    loadCharactersFailed: (error: string) => void;

    getCharacterByID: (id: string) => Promise<Character>;
};


export const charactersStore = reactive<CharactersState>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: [],
    },

    ids: {
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: {},
    },

    startLoadingCharacters() {
    },
    loadedCharacters(data: Character[] | string) {

        if (typeof data === 'string') {
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

    async getCharacterByID(id: string) {
        if (this.ids.list[id]) {
            return this.ids.list[id]
        }

        this.ids.isLoading = true;

        try {
            const {data} = await gameOfThronesApi.get<Character>(`/Characters/${id}`)
            this.ids.list[id] = data
        } catch (err) {
            this.ids.hasError = true;
            if (axios.isAxiosError(err)) {
                this.ids.errorMessage = err.message;
                return Promise.reject(err);
            }
            this.ids.errorMessage = `could not load character: ${id}`
            return Promise.reject("could not load character");
        } finally {
            this.ids.isLoading = false;
        }


        return this.ids.list[id];
    }

});
