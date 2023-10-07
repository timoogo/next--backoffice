export interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  type: string;
  date: string;
  duration: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
    
export interface EventPageProps {
  event: Event;
}