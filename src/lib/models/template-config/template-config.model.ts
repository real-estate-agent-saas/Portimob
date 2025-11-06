export interface TemplateConfigDefault {
  mainColor: string;
  bannerText: string;
  showFeatured: boolean;
  footerNote: string;
}

export interface TemplateConfigModern {
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle?: string;
  backgroundImage?: string;
}

export type TemplateConfigMap = {
  default: TemplateConfigDefault;
  modern: TemplateConfigModern;
};
