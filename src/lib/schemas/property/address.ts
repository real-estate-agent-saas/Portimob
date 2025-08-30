export type Address = {
  id: number;
  street: string;
  propertyNumber: string | null;
  complement: string | null;
  neighborhood: string;
  city: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  zoneId: number | null;
  stateId: number | null;
  propertyId: number;
};
