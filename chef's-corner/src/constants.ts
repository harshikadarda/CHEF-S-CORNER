import { Recipe } from './types';

export const TRENDY_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Salmon Bowl',
    author: 'Chef Marco Pierre',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    time: '25 min',
    servings: '2 servings',
    difficulty: 'Medium',
    calories: '420 kcal',
    category: 'Popular',
    ingredients: [
      { name: 'Fresh Salmon Fillets', amount: '2 pcs' },
      { name: 'Organic Wild Honey', amount: '3 tbsp' },
      { name: 'Soy Sauce (Low Sodium)', amount: '1 tbsp' },
      { name: 'Minced Garlic Cloves', amount: '2 units' },
    ],
    instructions: [
      { step: 1, title: 'Prepare the Glaze', description: 'In a small bowl, whisk together the honey, soy sauce, lemon juice, and minced garlic until well combined.' },
      { step: 2, title: 'Season the Salmon', description: 'Pat the salmon fillets dry with a paper towel. Season both sides generously with salt and black pepper.' },
      { step: 3, title: 'Sear and Glaze', description: 'Heat olive oil in a pan over medium-high heat. Sear salmon for 3-4 minutes per side. Pour the glaze over the fish in the last 2 minutes.' },
    ]
  },
  {
    id: '2',
    title: 'Homemade Pesto Linguine',
    author: 'Chef Isabella',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    time: '15 min',
    servings: '4 servings',
    difficulty: 'Easy',
    calories: '380 kcal',
    category: 'Quick',
    ingredients: [],
    instructions: []
  }
];

export const RECENT_RECIPES: Recipe[] = [
  {
    id: '3',
    title: 'Avocado Garden Toast',
    author: 'Healthy Eats',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    time: '10 min',
    servings: '1 serving',
    difficulty: 'Easy',
    category: 'Breakfast',
    ingredients: [],
    instructions: []
  },
  {
    id: '6',
    title: 'Quinoa Power Salad',
    author: 'Vegan Chef Sarah',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    time: '15 min',
    servings: '2 servings',
    difficulty: 'Easy',
    category: 'Vegan',
    ingredients: [],
    instructions: []
  },
  {
    id: '4',
    title: 'Zesty Chicken Bowl',
    author: 'Grill Master',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    time: '35 min',
    servings: '2 servings',
    difficulty: 'Medium',
    category: 'Lunch',
    ingredients: [],
    instructions: []
  },
  {
    id: '5',
    title: 'Dark Lava Cake',
    author: 'Pastry Chef Leo',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    time: '20 min',
    servings: '2 servings',
    difficulty: 'Pro',
    category: 'Dessert',
    ingredients: [],
    instructions: []
  }
];

export const CATEGORIES = [
  { id: 'popular', name: 'Popular', icon: 'Flame' },
  { id: 'breakfast', name: 'Breakfast', icon: 'Coffee' },
  { id: 'vegan', name: 'Vegan', icon: 'Leaf' },
  { id: 'quick', name: 'Quick', icon: 'Timer' },
  { id: 'desserts', name: 'Desserts', icon: 'IceCream' },
];
