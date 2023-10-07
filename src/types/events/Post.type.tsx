export type EventFormData = {
  name: string;
  organizer: { id: number };
  participants: Array<{ id: number }>;
  tags: { id: number };
  description: string;
  image: string;
  location: string;
  date: string;
  duration: number;
  status: string;
};