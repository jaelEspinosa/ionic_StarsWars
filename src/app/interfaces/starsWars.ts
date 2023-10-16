// Generated by https://quicktype.io

export interface CharactersResponse {
  info: Info;
  data: Data[]
}

export interface Data {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

/* export interface Character {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

export interface Organization {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

export interface Creature {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

export interface Droid {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

export interface Location {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

export interface Specie {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
}

export interface Vehicle {
  _id:         string;
  name:        string;
  description: string;
  image:       string;
  __v:         number;
} */

export interface Info {
  total: number;
  page:  number;
  limit: number;
  next:  string;
  prev:  string;
}