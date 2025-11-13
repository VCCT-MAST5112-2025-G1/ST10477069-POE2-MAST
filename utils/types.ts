export type Meal = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  type: 'starter' | 'main' | 'dessert';
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

export type TabParamList = {
  Home: undefined;
  AddMeal: undefined;
  Filter: undefined;
};

