import {
  LayoutDashboard,
  User,
  PenTool,
  FileText,
  Settings,
  BarChart3,
  MessageSquare,
  Home,
  Calendar,
  Search,
  LogOut,
} from "lucide-react";

export const ROUTES = {
  public: {
    home: { title: "Início", path: "/", icon: Home },
    signUp: { title: "Cadastrar", path: "/signUp" },
    signIn: { title: "Entrar", path: "/signIn" },
    forgotPassword: { title: "Recuperar senha", path: "/forgotPassword" },
    pricing: { title: "Planos", path: "/pricing" },
  },
  private: {
    dashboard: { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    profile: { title: "Perfil", path: "/profile", icon: User },
    hub: { title: "Central de Navegação", path: "/hub", icon: Home },
    createPost: { title: "Criar Post", path: "/blog/novo", icon: PenTool },
    posts: { title: "Ver Posts", path: "/blog/post", icon: FileText },
    reports: { title: "Relatórios", path: "/dashboard", icon: BarChart3 },
    messages: { title: "Mensagens", path: "/dashboard", icon: MessageSquare },
    agenda: { title: "Agenda", path: "/dashboard", icon: Calendar },
    search: { title: "Buscar", path: "/dashboard", icon: Search },
    configuration: { title: "Configurações", path: "/configuration", icon: Settings },
    logout: { title: "Sair", path: "/login", icon: LogOut },
    property: (id: string) => ({
      title: "Imóvel",
      path: `/properties/${id}`,
    }),
  },
} as const;
