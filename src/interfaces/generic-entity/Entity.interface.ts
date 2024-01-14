export interface Entity {
    id: number;
    name: string;
    category: string;
    type: string;
    color?: string;
}
  
export interface EntityPageProps<T> {
    entities: T[];
}