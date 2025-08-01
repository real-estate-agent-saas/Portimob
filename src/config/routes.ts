// Rotas de navegação da aplicação
export const ROUTES = {
  public: {
    home: "/",
    signUp: "/signUp",
    signIn: "/signIn",
    forgotPassword: "/forgotPassword",
    pricing: "/procing",
  },
  private: {
    dashboard: "/dashboard",
    profile: "/profile",
    property: (id: string) => `/properties/${id}`,
  },
  tenant: (slug: string) => ({
    home: `/${slug}`,
    contact: `/${slug}/contato`,
    properties: `/${slug}/imoveis`,
  }),
};
