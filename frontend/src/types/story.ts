import { Timestamp } from "firebase/firestore";

export interface StoryData {
  storyId: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  contentHTML: string;
}
