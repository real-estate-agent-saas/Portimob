interface PropertyDetailsProps {
  params: { slug: string; propertyId: string }; // note que propertyId vem como string
}

export default function PropertyDetails({ params }: PropertyDetailsProps) {
  const { slug, propertyId } = params;

  return (
    <div>
      <h1>Imóvel individual - {propertyId} do corretor {slug}</h1>
    </div>
  );
}
