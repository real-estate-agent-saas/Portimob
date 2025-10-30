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

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const response = await getProperty(userId, propertyId);
//         setProperty(response);
//       } catch (error) {
//         console.log("Erro ao buscar imóvel:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [userId, propertyId]);

//   if (loading) return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="animate-pulse text-center">
//         <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
//         <p className="text-gray-600">Carregando imóvel...</p>
//       </div>
//     </div>
//   );

//   if (!property) return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <span className="text-2xl">🏠</span>
//         </div>
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">Imóvel não encontrado</h2>
//         <p className="text-gray-600">O imóvel solicitado não está disponível.</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
//           <p className="text-gray-500 mt-2">ID: {property.id}</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* Cover Image */}
//           <div className="relative h-80 sm:h-96">
//             <CldImage
//               alt="Foto capa do imóvel destaque"
//               fill
//               className="object-cover"
//               src={property.coverImage || ""}
//               priority
//             />
//           </div>

//           {/* Content */}
//           <div className="p-6 sm:p-8">
//             {/* Price Badge */}
//             <div className="mb-6">
//               <span className="inline-block bg-green-100 text-green-800 text-2xl font-bold px-4 py-2 rounded-lg">
//                 {property.price}
//               </span>
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">Descrição</h2>
//               <p className="text-gray-600 leading-relaxed">{property.description}</p>
//             </div>

//             {/* Additional Info */}
//             <div className="border-t border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações do Imóvel</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="flex items-center text-gray-600">
//                   <span className="mr-2">🏷️</span>
//                   <span>ID: {property.id}</span>
//                 </div>
//                 {/* Adicione mais informações aqui conforme necessário */}
//                 <div className="flex items-center text-gray-600">
//                   <span className="mr-2">📅</span>
//                   <span>Disponível para visita</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="mt-8 text-center">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105">
//             Agendar Visita
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }