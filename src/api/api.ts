import { Animal } from "@/types";

export const fetchAnimals = async (): Promise<Animal[]> =>
  await fetch("http://localhost:3000/data.json").then((res) => res.json());

export const fetchAnimal = async (slug: string): Promise<Animal> => {
  const animals = await fetchAnimals();
  const foundAnimal = animals.find((animal) => animal.slug === slug);
  if (!foundAnimal) {
    throw new Error(`Animal with slug "${slug}" not found`);
  }
  return foundAnimal;
};
