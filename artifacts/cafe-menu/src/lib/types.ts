export interface MenuItem {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  available: boolean;
  sortOrder?: number | null;
}
