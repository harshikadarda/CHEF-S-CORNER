export interface Recipe {
  id: string;
  title: string;
  author: string;
  image: string;
  rating: number;
  time: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Pro';
  calories?: string;
  category: string;
  ingredients: { name: string; amount: string }[];
  instructions: { step: number; title: string; description: string }[];
}

export type View = 'home' | 'detail' | 'upload' | 'saved' | 'profile' | 'discover';
