import type {CharacterDetails} from "@/api/gameOfThrones/models/CharacterDetails";

export type Character = {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    family: string;
    image: string;
    imageUrl: string;
    details?: CharacterDetails[];
};

