export const DEFFAULT_TEMPLATE_ROUTES = {
  home: { title: "Início", path: "/" },
  about: { title: "Sobre", path: "/about" },
  contact: { title: "Contato", path: "/contact" },
  propertiesList: { title: "Imóveis", path: "/properties" },
  announceProperty: {
    title: "Anunciar Imóvel",
    path: "/announceProperty",
  },
  favorites: { title: "Favoritos", path: "/favorites" },
} as const;