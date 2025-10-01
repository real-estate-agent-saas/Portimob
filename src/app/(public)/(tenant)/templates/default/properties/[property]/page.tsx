type Props = {
  params: { property: string };
};

export default async function PropertyPage({ params }: Props) {
  const { property } = params;

  return (
    <div>
      <h1>{property}</h1>
    </div>
  );
}

// export default async function PropertyPage() {
//   return (
//     <div>
//       <h1>Imóvel individual</h1>
//     </div>
//   );
// }
