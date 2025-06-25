interface Range {
  min: number;
  max: number;
}

export interface Animal {
  slug: string;
  name: string;
  latinName: string;
  family: string;
  weight: number | Range;
  lifeExpectancy: number;
  gestationPeriod: number;
  description: string;
}
