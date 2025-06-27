import { fetchAnimal } from "@/api/api";
import TokenAvailability from "../components/TokenAvailabilty";
import AdoptButton from "../components/AdoptButton";

export default async function AnimalPage({
  params,
}: {
  params: Promise<{ animal: string }>;
}) {
  const { animal: animalSlug } = await params;
  const animal = await fetchAnimal(animalSlug);

  const formattedDescription = animal.description.replaceAll("\n", "<br>");

  return (
    <div className="page-container pt-8">
      <h1>{animal.name}</h1>
      <div className="italic">{animal.latinName}</div>
      <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />

      {animal.animals.map((animal) => (
                <li key={animal.id}>
                  <p>{ animal.name }</p>
                  

                    <TokenAvailability tokenId={animal.id} />
                    <AdoptButton tokenId={animal.id} />
                </li>
              ))}
    </div>
  );
}
