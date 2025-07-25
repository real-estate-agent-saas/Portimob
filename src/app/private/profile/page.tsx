"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/profile/profile";
import { Logout } from "@/services/auth"; 
import { ROUTES } from "@/config/routes";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await Logout(); 
      window.location.href = ROUTES.public.signIn; 
    } catch (error) {
      alert("Erro ao fazer logout. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!user) {
    window.location.href = ROUTES.public.signIn;
    return null;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>ID: {user.id}</p>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
}
