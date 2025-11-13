import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMeals } from '../utils/MealsContext';
import { Meal } from '../utils/types';
import { styles } from '../styles';
import MealCard from '../components/MealCard';

export default function FilterScreen() {
  const { meals, cart, setCart, filterType, setFilterType, search, setSearch } = useMeals();
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>🔍 Filter Meals</Text>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Search</Text>
          <TextInput
            placeholder="Search by meal name..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Filter by Category</Text>
          <View style={styles.filterContainer}>
            {['all', 'starter', 'main', 'dessert'].map((type, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.filterButton, filterType === type && styles.activeFilter]}
                onPress={() => setFilterType(type as any)}
              >
                <Text style={[styles.filterText, filterType === type && styles.activeFilterText]}>
                  {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterInfoContainer}>
          <Text style={styles.filterInfoTitle}>Active Filters:</Text>
          <Text style={styles.filterInfoText}>
            Category: {filterType === 'all' ? 'All' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Text>
          {search && (
            <Text style={styles.filterInfoText}>
              Search: "{search}"
            </Text>
          )}
          <Text style={styles.filterInfoText}>
            Results: {filteredMeals.length} item(s)
          </Text>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Filtered Meals</Text>
          {filteredMeals.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No meals match your filters. Try adjusting your search or category.</Text>
            </View>
          ) : (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

