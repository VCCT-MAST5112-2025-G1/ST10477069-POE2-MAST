import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMeals } from '../utils/MealsContext';
import { styles } from '../styles';

export default function AddMealScreen() {
  const { meals, setMeals } = useMeals();
  const [newMeal, setNewMeal] = useState({ name: '', price: '', image: '', description: '', type: 'main' as 'starter' | 'main' | 'dessert' });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.price || !newMeal.image || !newMeal.description) {
      Alert.alert('Error', 'Please fill all fields including description!');
      return;
    }
    const mealId = Date.now().toString();
    setMeals((prevMeals) => [...prevMeals, { ...newMeal, id: mealId }]);
    setNewMeal({ name: '', price: '', image: '', description: '', type: 'main' });
    Alert.alert('Added', 'New meal added successfully!');
  };

  const handleRemoveMeal = (mealId: string, mealName: string) => {
    Alert.alert(
      'Remove Meal',
      `Are you sure you want to remove "${mealName}" from the menu?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
            Alert.alert('Removed', `${mealName} has been removed from the menu.`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons name="settings" size={28} color="#ff7f50" />
          <Text style={styles.header}>Manage Menu</Text>
        </View>

        <View style={styles.addMealContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Ionicons name="add-circle" size={20} color="#333" />
            <Text style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>Add New Meal</Text>
          </View>
          <TextInput
            placeholder="Meal name"
            value={newMeal.name}
            onChangeText={text => setNewMeal({ ...newMeal, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newMeal.description}
            onChangeText={text => setNewMeal({ ...newMeal, description: text })}
            style={styles.input}
            multiline
            numberOfLines={2}
          />
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            value={newMeal.price}
            onChangeText={text => setNewMeal({ ...newMeal, price: text })}
            style={styles.input}
          />
          <Text style={styles.categoryLabel}>Meal Photo:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.addButtonMain}
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  quality: 1,
                });
                if (!result.canceled) {
                  setNewMeal({ ...newMeal, image: result.assets[0].uri });
                }
              }}
            >
              <Text style={styles.buttonText}>Add Photo</Text>
            </TouchableOpacity>
            {newMeal.image ? (
              <Image source={{ uri: newMeal.image }} style={{ width: 50, height: 50, borderRadius: 8, marginLeft: 15 }} />
            ) : null}
          </View>
          <Text style={styles.categoryLabel}>Category:</Text>
          <View style={styles.categoryContainer}>
            {(['starter', 'main', 'dessert'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.categoryButton,
                  newMeal.type === type && styles.activeCategoryButton
                ]}
                onPress={() => setNewMeal({ ...newMeal, type })}
              >
                <Text style={[
                  styles.categoryButtonText,
                  newMeal.type === type && styles.activeCategoryButtonText
                ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addButtonMain} onPress={handleAddMeal}>
            <Text style={styles.addButtonText}>Add Meal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuItemsContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Ionicons name="list" size={20} color="#333" />
            <Text style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>Current Menu Items ({meals.length})</Text>
          </View>
          {meals.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No menu items yet. Add your first meal above!</Text>
            </View>
          ) : (
            meals.map((meal) => (
              <View key={meal.id} style={styles.manageMealCard}>
                <Image source={{ uri: meal.image }} style={styles.manageMealImage} />
                <View style={styles.manageMealInfo}>
                  <Text style={styles.manageMealName}>{meal.name}</Text>
                  <Text style={styles.manageMealDescription}>{meal.description}</Text>
                  <View style={styles.manageMealDetails}>
                    <Text style={styles.manageMealPrice}>${meal.price}</Text>
                    <Text style={styles.manageMealType}>
                      {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveMeal(meal.id, meal.name)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

