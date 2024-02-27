export interface Properties {
  error?: Error;
}

export type CountryType = {
  id: string;
  name: string;
};

export interface TaxFormElement extends HTMLFormElement {
  taxId?: string;
  username?: string;
}
