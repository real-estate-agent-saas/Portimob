// "use client";

// import { getProperty } from "@/api/tenant/property/route";
// import { useTenant } from "@/lib/contexts/TenantContext";
// import { Property } from "@/lib/schemas/property/property";
// import { useEffect, useState } from "react";
// // Cloudinary
// import { CldImage } from "next-cloudinary";

// type PropertyProps = {
//   propertyId: number;
// };

// export default function PropertyPage({ propertyId }: PropertyProps) {
//   const userId = useTenant().website.userId;
//   const [property, setProperty] = useState<Property | null>(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchProperty = async () => {
//   //     try {
//   //       const response = await getProperty( propertyId);
//   //       setProperty(response);
//   //     } catch (error) {
//   //       console.log("Erro ao buscar imóvel:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchProperty();
//   // }, [userId, propertyId]);

//   if (loading) return <p>Carregando...</p>;
//   if (!property) return <p>Imóvel não encontrado</p>;

//   return (
//     <div>
//       <h1>Imóvel</h1>

//       <CldImage
//         alt="Foto capa do imóvel destaque"
//         width={200}
//         height={200}
//         className="object-cover"
//         src={property.coverImage || ""}
//         priority
//       />
//       <p>Nome: {property.title}</p>
//       <p>ID: {property.id}</p>
//       <p>Descrição: {property.description}</p>
//       <p>Preço: {property.price}</p>
//     </div>
//   );
// }
