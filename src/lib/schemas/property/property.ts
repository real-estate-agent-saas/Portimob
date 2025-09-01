import { Address } from "./address";
import { DeliveryStatus } from "./deliveryStatus";
import { PropertyTypology } from "./propertyTypology";
import { PropertyType } from "./propertyType";
import { PropertyStanding } from "./propertyStanding";
import { PropertyPurpose } from "./propertyPurpose";
import { PropertyGallery } from "./propertyGallery";
import { FloorPlanGallery } from "./floorPlanGallery";
import { Leisure } from "./propertyLeisure";

export type Property = {
  // Basic data
  id: number;
  title: string;
  description: string | null;
  roomsQty: number;
  bathroomsQty: number;
  parkingSpacesQty: number;
  area: number | null;
  youtubeURL: string | null;
  price: number | null;
  coverImage: string | null;
  isFurnished: boolean | null;
  isNearSubway: boolean | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationship data
  address: Address;
  deliveryStatus: DeliveryStatus | null;
  propertyTypology: PropertyTypology | null;
  propertyType: PropertyType | null;
  propertyStanding: PropertyStanding | null;
  propertyPurpose: PropertyPurpose | null;
  propertyGallery: PropertyGallery[];
  floorPlanGallery: FloorPlanGallery[];
  propertyLeisure: Leisure[];
};

export type FeaturedProperty = {
  id: number;
  title: string;
  price: number | null;
  coverImage: string | null;
  address: {
    city: string | null;
  };
};
