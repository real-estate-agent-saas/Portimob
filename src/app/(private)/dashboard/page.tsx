import { Link } from "lucide-react";
import { ROUTES } from "@/config/routes";

export default function Dashboard() {
  return (
    <>
      <h1>Página de Dashboard</h1>
      <a href="/profile" className="primary-text hover:underline">
        Perfil
      </a>
    </>
  );
}
