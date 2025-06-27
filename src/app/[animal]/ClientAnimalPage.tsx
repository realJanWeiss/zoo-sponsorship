// app/animal/[animal]/ClientAnimalPage.tsx
"use client";

import { useState } from "react";
import TokenAvailability from "../components/TokenAvailabilty";
import AdoptButton from "../components/AdoptButton";
import Image from "next/image";
import InformationRow from "./InformationRow";
import { Animal } from "@/types";

export default function ClientAnimalPage({ animal }: { animal: Animal }) {
  const formattedDescription = animal.description.replaceAll("\n", "<br>");
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="page-container pt-8 pb-24">
      <h1>{animal.name}</h1>
      <div className="italic mb-4">{animal.latinName}</div>
      <div className="flex flex-wrap gap-8 mb-8">
        <div>
          <Image
            className="w-[650px] max-w-full"
            src={animal.image.src}
            width={animal.image.width}
            height={animal.image.height}
            alt={animal.name}
          />
          <div className="text-sm text-gray-700 mt-2">
            via <a href={animal.image.originalSrc}>Wikimedia Commons</a>,
            licensed under{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">
              CC BY-SA 4.0
            </a>
            .
          </div>
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animal.animals.map((animal) => (
          <div
            key={animal.id}
            className="rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2 bg-white"
          >
            <p className="text-lg font-medium">{animal.name}</p>

            <TokenAvailability tokenId={animal.id} refreshKey={refreshKey} />

            <AdoptButton tokenId={animal.id} onAdopted={triggerRefresh} />
          </div>
        ))}
      </div>
    </div>
  );
}
