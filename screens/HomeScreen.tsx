import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMeals } from '../utils/MealsContext';
import { Meal } from '../utils/types';
import { styles } from '../styles';
import AveragePriceCard from '../components/AveragePriceCard';
import MealCard from '../components/MealCard';

export default function HomeScreen() {
  const { meals, cart, setCart, filterType, search, setSearch } = useMeals();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAddToCart = (meal: Meal) => {
    setCart([...cart, meal]);
  };

  const filteredMeals = meals.filter(
    m =>
      (filterType === 'all' || m.type === filterType) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  function getMealsByType(courseType: 'starter' | 'main' | 'dessert'): Meal[] {
    const filteredMealsList: Meal[] = [];
    let index = 0;

    while (index < meals.length) {
      if (meals[index].type === courseType) {
        filteredMealsList.push(meals[index]);
      }
      index++;
    }

    return filteredMealsList;
  }

  function calculateAveragePriceForType(courseType: 'starter' | 'main' | 'dessert'): number {
    const courseMeals = getMealsByType(courseType);
    
    if (courseMeals.length === 0) {
      return 0;
    }

    let totalPrice = 0;
    for (let i in courseMeals) {
      totalPrice += parseFloat(courseMeals[i].price);
    }

    return totalPrice / courseMeals.length;
  }

  function calculateAveragePrices(): Record<string, number> {
    const courseTypes: ('starter' | 'main' | 'dessert')[] = ['starter', 'main', 'dessert'];
    const averages: Record<string, number> = {};

    for (let i = 0; i < courseTypes.length; i++) {
      const courseType = courseTypes[i];
      averages[courseType] = calculateAveragePriceForType(courseType);
    }

    return averages;
  }

  const averagePrices = calculateAveragePrices();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons name="restaurant" size={28} color="#ff7f50" />
          <Text style={styles.header}>Food Menu</Text>
        </View>

        <View style={styles.averagePricesContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Ionicons name="stats-chart" size={20} color="#333" />
            <Text style={[styles.averagePricesTitle, { marginLeft: 8 }]}>Average Prices by Course</Text>
          </View>
          <View style={styles.averagePricesGrid}>
            {Object.keys(averagePrices).map((courseType) => {
              const avgPrice = averagePrices[courseType];
              const courseCount = meals.filter(m => m.type === courseType).length;
              return (
                <AveragePriceCard
                  key={courseType}
                  courseType={courseType}
                  avgPrice={avgPrice}
                  courseCount={courseCount}
                />
              );
            })}
          </View>
        </View>

        <TextInput
          placeholder="Search by meal name..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {!showProducts && (
          <TouchableOpacity
            style={styles.showProductsButton}
            onPress={() => setShowProducts(true)}
          >
            <Ionicons 
              name="eye" 
              size={20} 
              color="#fff" 
              style={{ marginRight: 8 }}
            />
            <Text style={styles.buttonText}>Show Products</Text>
          </TouchableOpacity>
        )}

        {showProducts && (
          <Animated.View style={{ opacity: fadeAnim }}>
            {filteredMeals.map((meal) => {
              const isInCart = cart.some(item => item.id === meal.id);
              return (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  isInCart={isInCart}
                  onAddToCart={handleAddToCart}
                />
              );
            })}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

