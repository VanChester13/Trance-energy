export interface Characteristics {
  speed: number;
  force: number;
  engineAmperage: number;
}

export interface Train {
  name: string;
  description: string;
  characteristics: Characteristics[];
}

export interface InitData {
  data: Train[];
}

export const url: string = "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json"