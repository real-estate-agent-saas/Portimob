"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/profile/profile";
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

  if (loading) return <p>Carregando...</p>;
  if (!user) return (window.location.href = ROUTES.public.signIn);
  return (
    <div>
      <h1>Perfil</h1>
      <p>Nome: {user.id}</p>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
