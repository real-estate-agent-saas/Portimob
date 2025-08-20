// Next, React
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

// Types
import { profileFormValues } from "@/lib/schemas/user/profileForm";
import { Specialty } from "@/lib/schemas/user/specialty";

// Services
import { getAllSpecialties } from "@/services/user/profile";

// Custom Hook
export default function useSpecialtyForm(
  form: UseFormReturn<profileFormValues>,
  setLoading: (state: boolean) => void
) {
  // Recives all specialties from database
  const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);

  // Specialty IDs selected by user
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<number[]>(
    []
  );

  // Open and close specialties list
  const [openSpecialtiesList, setOpenSpecialtiesList] = useState(false);

  // Specialties to display on frontend
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>(
    []
  );

  // Watches a specific form field for changes and gets it values
  const specialtiesWatched = useWatch({
    control: form.control,
    name: "specialties",
  });

  // Initialize specialty list of IDs with the previously ones related to the user
  useEffect(() => {
    if (!specialtiesWatched) return;

    const initialSpecialtyIds = specialtiesWatched.map((s) => s);
    setSelectedSpecialtyIds(initialSpecialtyIds);

    const initialSpecialties = allSpecialties.filter((s) => initialSpecialtyIds.includes(s.id));
    setSelectedSpecialties(initialSpecialties);
  }, [specialtiesWatched, allSpecialties]);

  // Busca todas as especialidades disponíveis
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

  const addSpecialty = (specialtyId: number) => {
    // Verifies if the ID provided is valid
    const specialty = allSpecialties.find((s) => s.id === specialtyId);
    if (!specialty) return;

    // Verifies if the ID is already selected
    const alreadySelected = selectedSpecialtyIds.some((s) => s === specialtyId);
    if (!alreadySelected) {
      // Updates the ID array
      const updatedSpecialtyIds = [...selectedSpecialtyIds, specialtyId];
      setSelectedSpecialtyIds(updatedSpecialtyIds);

      // Updates the Specialty object array
      const newSpecialty = allSpecialties.find((s) => s.id === specialtyId);
      if (!newSpecialty) return; // garante que não adicionamos undefined
      const updatedSpecialties = [...selectedSpecialties, newSpecialty];
      setSelectedSpecialties(updatedSpecialties);

      form.setValue("specialties", updatedSpecialtyIds);
    }
  };

  // Removes a specialty based on its ID
  const removeSpecialty = (specialtyId: number) => {
    // Updates the ID array
    const updatedSpecialtyIds = selectedSpecialtyIds.filter(
      (s) => s !== specialtyId
    );
    setSelectedSpecialtyIds(updatedSpecialtyIds);

    // Updates the Specialty object array
    const updatedSpecialties = selectedSpecialties.filter(
      (s) => s.id !== specialtyId
    );
    setSelectedSpecialties(updatedSpecialties);

    form.setValue("specialties", updatedSpecialtyIds);
  };

  return {
    allSpecialties,
    selectedSpecialties,
    selectedSpecialtyIds,
    addSpecialty,
    removeSpecialty,
    openSpecialtiesList,
    setOpenSpecialtiesList,
  };
}
