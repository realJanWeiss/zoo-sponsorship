import { fetchAnimal } from "@/api/api";
import ClientAnimalPage from "./ClientAnimalPage";

export default async function AnimalPage({ params }: { params: { animal: string } }) {
  const { animal: animalSlug } = await params;
  const animal = await fetchAnimal(animalSlug);
  return <ClientAnimalPage animal={animal} />;
}