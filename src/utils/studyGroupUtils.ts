import { categoryMapping } from "../constants/categoryMapping.ts";
import { locationMapping } from "../constants/locationMapping.ts";
import { StudyGroupDto } from "../api/studyGroupApi.ts";

export const transformStudyGroupData = (studyGroup: StudyGroupDto) => {
  return {
    ...studyGroup,
    category: categoryMapping[studyGroup.category] || studyGroup.category,
    location: locationMapping[studyGroup.location] || studyGroup.location,
  };
};

export const transformStudyGroupFromResult = (studyGroupResult: StudyGroupDto) => {
  return {
    ...studyGroupResult,  
    category: categoryMapping[studyGroupResult.category] || studyGroupResult.category,  
    location: locationMapping[studyGroupResult.location] || studyGroupResult.location, 
  };
};

export const transformCategoryToKorean = (category: string): string => {
  return categoryMapping[category] || category;
};