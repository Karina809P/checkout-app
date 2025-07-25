export interface Point {
  type: "Download location" | "Place of unloading" | "Additional point";
  label: string;
  location: string;
  time?: string;          // робимо необов’язковим
  operatingTime?: string; // робимо необов’язковим
}
