import { fetchAnimal } from "@/api/api";
import TokenAvailability from "../components/TokenAvailabilty";
import AdoptButton from "../components/AdoptButton";
import Image from "next/image";
import InformationRow from "./InformationRow";

export default async function AnimalPage({
  params,
}: {
  params: Promise<{ animal: string }>;
}) {
  const { animal: animalSlug } = await params;
  const animal = await fetchAnimal(animalSlug);

  const formattedDescription = animal.description.replaceAll("\n", "<br>");

  return (
    <div className="page-container pt-8 pb-24">
      <h1>{animal.name}</h1>
      <div className="italic mb-4">{animal.latinName}</div>
      <div className="flex flex-wrap gap-8 mb-8">
        <Image
          src={animal.image.src}
          width={animal.image.width}
          height={animal.image.height}
          alt={animal.name}
        />
        <ul className="flex flex-col gap-2">
          <InformationRow label="Familie" value={animal.family} />
          <InformationRow
            label="Gewicht"
            value={
              typeof animal.weight === "object"
                ? `${animal.weight.min} - ${animal.weight.max} kg`
                : `${animal.weight} kg`
            }
          />
          <InformationRow
            label="Lebensdauer"
            value={`${animal.lifeExpectancy} Jahre`}
          />
          <InformationRow
            label="Tragzeit"
            value={`${animal.gestationPeriod} Tage`}
          />
        </ul>
      </div>
      <h2>Beschreibung</h2>
      <p
        className="max-w-[80ch]"
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
      />

      <h2>Tiere in unserem Zoo</h2>
      {animal.animals.map((animal) => (
        <li key={animal.id}>
          <p>{animal.name}</p>

          <TokenAvailability tokenId={animal.id} />
          <AdoptButton tokenId={animal.id} />
        </li>
      ))}
    </div>
  );
}
