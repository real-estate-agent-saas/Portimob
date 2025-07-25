// Rotas de navegação da aplicação
export const ROUTES = {
  public: {
    home: '/',
    signUp: '/public/signUp',
    signIn: '/public/signIn',
    forgotPassword: '/public/forgotPassword',
  },
  private: {
    dashboard: '/private/dashboard',
    profile: '/private/profile',
    property: (id: string) => `/private/properties/${id}`,
  },
  tenant: (slug: string) => ({
    home: `/${slug}`,
    contact: `/${slug}/contato`,
    properties: `/${slug}/imoveis`,
  }),
};
