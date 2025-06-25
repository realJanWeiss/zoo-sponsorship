import { fetchAnimals } from "@/api/api";
import { Animal } from "@/types";
import Image from "next/image";

export default async function Home() {
  const animals: Animal[] = await fetchAnimals();

  return (
    <div>
      <h1 className="page-container">Tiergarten</h1>
      <ul className="page-container grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
        {animals.map((animal) => (
          <li key={animal.slug}>
            <a className="block" href={`/${animal.slug}`}>
              <Image
                src={`/${animal.slug}-thumbnail.jpg`}
                height={206}
                width={310}
                alt=""
              />
              {animal.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
