export type IPricingDataObject = Record<string, string>;

export interface IPricingData {
  type: string;
  pricePerMonth: string;
  buttonText: string;
  summary: string;
  listTitle: string;
  features: string[];
}
