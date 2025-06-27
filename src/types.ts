interface Range {
  min: number;
  max: number;
}

interface SpecificAnimal {
  name: string;
  id: number;
}

interface ImageAsset {
  src: string;
  width: number;
  height: number;
  originalSrc?: string;
}

export interface Animal {
  slug: string;
  name: string;
  latinName: string;
  family: string;
  weight: number | Range;
  lifeExpectancy: number;
  gestationPeriod: number;
  image: ImageAsset;
  description: string;
  animals: SpecificAnimal[];
}
