import React, { useState, useEffect, createContext, useContext } from 'react';
import { Meal } from './types';

export type MealsContextType = {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  cart: Meal[];
  setCart: React.Dispatch<React.SetStateAction<Meal[]>>;
  filterType: 'all' | 'starter' | 'main' | 'dessert';
  setFilterType: React.Dispatch<React.SetStateAction<'all' | 'starter' | 'main' | 'dessert'>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within MealsProvider');
  }
  return context;
};

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: 'Vegetable Salad', price: '10', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'A fresh and colorful mix of crisp vegetables such as lettuce, tomatoes, cucumbers, carrots, and bell peppers, tossed together to create a light and healthy dish. It\'s often seasoned with a touch of olive oil, lemon juice, or your favorite dressing for extra flavor. Perfect as a side dish or a nutritious meal on its own.', type: 'starter' },
    { id: '2', name: 'Lentil Soup', price: '8', image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg', description: 'A warm and hearty soup made from tender lentils cooked with onions, carrots, garlic, and spices. Its rich in flavor, full of protein, and perfect for a comforting and nutritious meal. Often served with bread or a squeeze of lemon for a delicious finishing touch.', type: 'starter' },
    { id: '3', name: 'Beef Burger', price: '15', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=80&q=80', description: 'A juicy grilled beef patty served in a soft, toasted bun with fresh lettuce, tomato, onion, and cheese. Topped with your choice of sauces for a delicious and satisfying meal that\'s perfect for any time of day.', type: 'main' },
    { id: '4', name: 'Margherita Pizza', price: '12', image: 'https://images.pexels.com/photos/10836977/pexels-photo-10836977.jpeg', description: 'A classic Italian pizza topped with rich tomato sauce, creamy mozzarella cheese, and fresh basil leaves. Baked to perfection with a crispy crust and simple, authentic flavors that highlight the beauty of fresh ingredients.', type: 'main' },
    { id: '5', name: 'Cheesecake', price: '9', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjOSkPERVYz6sVua0XzIQeUM2vxxuaX-6nQA&s', description: 'A rich and creamy dessert made with a smooth cheese filling on a buttery biscuit base. Often topped with fresh fruit, chocolate, or caramel for a perfectly sweet and indulgent treat.', type: 'dessert' },
    { id: '6', name: 'Chocolate Brownie', price: '7', image: 'https://images.pexels.com/photos/27359377/pexels-photo-27359377.jpeg', description: 'A rich, fudgy dessert made with smooth melted chocolate and baked to perfection for a soft and chewy texture. Often served warm with a scoop of ice cream or a drizzle of chocolate sauce for an extra indulgent treat.', type: 'dessert' },
  ]);

  const [cart, setCart] = useState<Meal[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'starter' | 'main' | 'dessert'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setMeals((prevMeals) => {
      let updated = false;
      const migratedMeals = prevMeals.map((meal, index) => {
        if (!meal.id) {
          updated = true;
          return { ...meal, id: `meal-${Date.now()}-${index}` };
        }
        if ((meal as any).type === 'fastfood') {
          updated = true;
          return { ...meal, type: 'main' };
        }
        return meal;
      }) as Meal[];
      
      return updated ? migratedMeals : prevMeals;
    });
    
    if ((filterType as any) === 'fastfood') {
      setFilterType('all');
    }
  }, []);

  return (
    <MealsContext.Provider value={{ meals, setMeals, cart, setCart, filterType, setFilterType, search, setSearch }}>
      {children}
    </MealsContext.Provider>
  );
}

