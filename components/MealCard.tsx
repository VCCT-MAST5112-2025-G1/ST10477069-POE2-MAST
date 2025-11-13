import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meal } from '../utils/types';
import { styles } from '../styles';

type MealCardProps = {
  meal: Meal;
  isInCart: boolean;
  onAddToCart: (meal: Meal) => void;
};

export default function MealCard({ meal, isInCart, onAddToCart }: MealCardProps) {
  return (
    <View style={styles.mealCard}>
      <Image source={{ uri: meal.image }} style={styles.mealImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.mealName}>{meal.name}</Text>
        <Text style={styles.mealDescription}>{meal.description}</Text>
        <Text style={styles.mealPrice}>${meal.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButtonSmall, isInCart && styles.addButtonChecked]}
        onPress={() => onAddToCart(meal)}
        disabled={isInCart}
      >
        {isInCart ? (
          <Ionicons name="checkmark" size={24} color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>+</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

