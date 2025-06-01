import { studyCategoryMapping } from "../constants/studyCategoryMapping.ts";
import { locationMapping } from "../constants/locationMapping.ts";
import { StudyGroupDto } from "../api/studyGroupApi.ts";

export const transformStudyGroupData = (studyGroup: StudyGroupDto) => {
  return {
    ...studyGroup,
    category: studyCategoryMapping[studyGroup.category] || studyGroup.category,
    location: locationMapping[studyGroup.location] || studyGroup.location,
  };
};

export const transformStudyGroupFromResult = (studyGroupResult: StudyGroupDto) => {
  return {
    ...studyGroupResult,  
    category: studyCategoryMapping[studyGroupResult.category] || studyGroupResult.category,  
    location: locationMapping[studyGroupResult.location] || studyGroupResult.location, 
  };
};

export const transformCategoryToKorean = (category: string): string => {
  return studyCategoryMapping[category] || category;
};