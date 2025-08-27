import {
  LayoutDashboard,
  User,
  PenTool,
  FileText,
  Settings,
  BarChart3,
  MessageSquare,
  Home,
  Search,
  LogOut,
  LogIn,
  CircleUserRound,
  KeyRound,
} from "lucide-react";

export const TENANT_ROUTES = {
  home: { title: "Início", path: "/" },
  about: { title: "Sobre", path: "/about" },
  contact: { title: "Contato", path: "/contact" },
  propertiesList: { title: "Imóveis", path: "/properties" },
  announceProperty: {
    title: "Anunciar Imóvel",
    path: "/announce",
  },
  favorites: { title: "Favoritos", path: "/favorites" },
} as const;

export function getTenantRoutes(slug: string) {
  return Object.fromEntries(
    Object.entries(TENANT_ROUTES).map(([key, value]) => [
      key,
      {
        ...value,
        path: `/${slug}${value.path === "/" ? "" : value.path}`,
      },
    ])
  ) as typeof TENANT_ROUTES;
}


export const GUEST_ROUTES = {
  home: { title: "Início", path: "/", icon: Home },
  signUp: { title: "Cadastrar", path: "/signUp", icon: CircleUserRound },
  signIn: { title: "Entrar", path: "/signIn", icon: LogIn },
  forgotPassword: {
    title: "Recuperar senha",
    path: "/forgotPassword",
    icon: KeyRound,
  },
} as const;

export const ADMIN_ROUTES = {
  dashboard: {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  profile: { title: "Perfil", path: "/profile", icon: User },
  hub: { title: "Central de Navegação", path: "/hub", icon: Home },
  createPost: { title: "Criar Post", path: "/blog/novo", icon: PenTool },
  posts: { title: "Ver Posts", path: "/blog/post", icon: FileText },
  reports: { title: "Relatórios", path: "/dashboard", icon: BarChart3 },
  messages: { title: "Mensagens", path: "/dashboard", icon: MessageSquare },
  search: { title: "Buscar", path: "/dashboard", icon: Search },
  settings: { title: "Configurações", path: "/settings", icon: Settings },
  logout: { title: "Sair", path: "/login", icon: LogOut },
} as const;
