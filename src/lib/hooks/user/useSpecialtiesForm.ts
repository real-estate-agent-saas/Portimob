// Next | React
import { useEffect, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

// Types | Schemas
import { WebsiteFormValues } from "@/lib/schemas/website/website.schema";
import { Specialty } from "@/lib/models/websites/value-objects/specialty";

// Services
import { getAllSpecialties } from "@/api/websites/user-website/website";

// Custom Hook
export default function useSpecialtyForm(
  form: UseFormReturn<WebsiteFormValues>,
  setLoading: (state: boolean) => void
) {
  // All specialties available
  const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);

  // Selected specialties by the user
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>(
    []
  );

  // Open and close specialties list
  const [openSpecialtiesList, setOpenSpecialtiesList] = useState(false);

  // Gets specialties watched in the form (to sync with selectedSpecialties state)
  const specialtiesWatched = useWatch({
    control: form.control,
    name: "specialties",
  });

  // Initialize specialty list with the previously ones related to the user
  useEffect(() => {
    if (!specialtiesWatched) return;

    // Syncs selectedSpecialties state with the form watched value
    setSelectedSpecialties(specialtiesWatched);
  }, [specialtiesWatched]);

  // Fetches all specialties from API
  useEffect(() => {
    const fetchAllSpecialties = async () => {
      setLoading(true);
      try {
        const response = await getAllSpecialties();
        setAllSpecialties(response);
      } catch (e) {
        console.error("Erro ao buscar especialidades:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllSpecialties();
  }, []);

  const updateFormSpecialties = (specialties: Specialty[]) => {
    form.setValue("specialties", specialties);
  };

  // Adds a specialty to the form
  const addSpecialty = (specialtyId: string) => {
    // Verifies if the ID provided is valid
    const specialty = allSpecialties.find((s) => s.id === specialtyId);
    if (!specialty) return;

    // Verifies if the specialty is already selected
    const alreadySelected = selectedSpecialties.some(
      (s) => s.id === specialtyId
    );
    if (alreadySelected) return;

    // Updates the array adding the new Specialty selected
    const updatedSpecialties = [...selectedSpecialties, specialty];
    setSelectedSpecialties(updatedSpecialties);

    // Updates the form with complete Specialty objects
    updateFormSpecialties(updatedSpecialties);
  };

  // Removes a specialty based on its ID
  const removeSpecialty = (specialtyId: string) => {
    // Updates the array removing the Specialty selected
    const updatedSpecialties = selectedSpecialties.filter(
      (s) => s.id !== specialtyId
    );
    setSelectedSpecialties(updatedSpecialties);

    // Updates form
    updateFormSpecialties(updatedSpecialties);
  };

  return {
    allSpecialties,
    selectedSpecialties,
    addSpecialty,
    removeSpecialty,
    openSpecialtiesList,
    setOpenSpecialtiesList,
  };
}
