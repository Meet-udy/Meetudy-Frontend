import { useState } from "react";

export interface StudyGroupDto {
  category: string;
  name: string;
  description: string;
  duration: string;
  location: string;
  maxParticipants: number;
  isOnline: boolean;
}

const useStudyGroupForm = (initialState: StudyGroupDto) => {
  const [formData, setFormData] = useState<StudyGroupDto>(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleLocationChange = (location: string) => {
    setFormData(prev => ({
      ...prev,
      location,
      isOnline: location === "online",
    }));
  };

  const handleMaxParticipantsChange = (value: number) => {
    setFormData(prev => ({ ...prev, maxParticipants: value }));
  };

  const handleDateChange = (start: string, end: string) => {
    setFormData(prev => ({ ...prev, duration: `${start} ~ ${end}` }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleCategoryChange,
    handleLocationChange,
    handleMaxParticipantsChange,
    handleDateChange,
  };
};

export default useStudyGroupForm;