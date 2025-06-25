import { fetchAnimal } from "@/api/api";

export default async function AnimalPage({
  params,
}: {
  params: Promise<{ animal: string }>;
}) {
  const { animal: animalSlug } = await params;
  const animal = await fetchAnimal(animalSlug);

  const formattedDescription = animal.description.replaceAll("\n", "<br>");

  return (
    <div className="page-container">
      <h1>{animal.name}</h1>
      <div className="italic">{animal.latinName}</div>
      <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
    </div>
  );
}
