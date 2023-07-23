import { Timestamp } from "firebase/firestore";

export interface StoryData {
  storyId: string;
  title: string;
  storyDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  contentHTML: string;
}
