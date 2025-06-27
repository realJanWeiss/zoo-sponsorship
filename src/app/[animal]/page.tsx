import { fetchAnimal } from "@/api/api";
import WalletConnect from "../components/WalletConnect";
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
    <div className="page-container">
      <div><WalletConnect /></div>

      <h1>{animal.name}</h1>
      <div className="italic">{animal.latinName}</div>
      <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      <TokenAvailability tokenId={1} />
      <AdoptButton tokenId={1} />
    </div>
  );
}
