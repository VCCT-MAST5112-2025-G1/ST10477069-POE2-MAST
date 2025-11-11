import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

type TabParamList = {
  Home: undefined;
  AddMeal: undefined;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ====== TYPES ======
type Meal = {
  name: string;
  price: string;
  image: string;
  description: string;
  type: 'starter' | 'main' | 'dessert' | 'fastfood';
};

// ====== CONTEXT ======
type MealsContextType = {
  meals: Meal[];
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  cart: Meal[];
  setCart: React.Dispatch<React.SetStateAction<Meal[]>>;
  filterType: 'all' | 'starter' | 'main' | 'fastfood' | 'dessert';
  setFilterType: React.Dispatch<React.SetStateAction<'all' | 'starter' | 'main' | 'fastfood' | 'dessert'>>;
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

// ====== MEALS PROVIDER ======
function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([
    { name: 'Vegetable Salad', price: '10', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'Fresh mixed vegetables with dressing', type: 'starter' },
    { name: 'Lentil Soup', price: '8', image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg', description: 'Warm and hearty lentil soup', type: 'starter' },
    { name: 'Beef Burger', price: '15', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=80&q=80', description: 'Juicy beef patty with fresh vegetables', type: 'fastfood' },
    { name: 'Margherita Pizza', price: '12', image: 'https://images.pexels.com/photos/10836977/pexels-photo-10836977.jpeg', description: 'Classic pizza with tomato and mozzarella', type: 'fastfood' },
    { name: 'Cheesecake', price: '9', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjOSkPERVYz6sVua0XzIQeUM2vxxuaX-6nQA&s', description: 'Creamy and delicious cheesecake', type: 'dessert' },
    { name: 'Chocolate Brownie', price: '7', image: 'https://th.bing.com/th/id/OIP.LzD5bFDUFDGJ4jcMuUtcXAHaHa?w=202&h=202&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Rich chocolate brownie with fudge', type: 'dessert' },
  ]);

  const [cart, setCart] = useState<Meal[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'starter' | 'main' | 'fastfood' | 'dessert'>('all');
  const [search, setSearch] = useState('');

  return (
    <MealsContext.Provider value={{ meals, setMeals, cart, setCart, filterType, setFilterType, search, setSearch }}>
      {children}
    </MealsContext.Provider>
  );
}

// ====== LOGIN SCREEN ======
function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) navigation.replace('MainTabs');
    else Alert.alert('Error', 'Please enter your email and password');
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.title}>🍴 Welcome to Food Menu App</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ====== HOME SCREEN ======
function HomeScreen() {
  const { meals, cart, setCart, filterType, search, setSearch } = useMeals();
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
    Alert.alert('Added', `${meal.name} added to cart!`);
  };

  const filteredMeals = meals.filter(
    m =>
      (filterType === 'all' || m.type === filterType) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  // Function to get meals by course type using while loop
  function getMealsByType(courseType: 'starter' | 'main' | 'dessert' | 'fastfood'): Meal[] {
    const filteredMealsList: Meal[] = [];
    let index = 0;

    // Use while loop to iterate through meals array
    while (index < meals.length) {
      if (meals[index].type === courseType) {
        filteredMealsList.push(meals[index]);
      }
      index++;
    }

    return filteredMealsList;
  }

  // Function to calculate average price for a specific course type
  function calculateAveragePriceForType(courseType: 'starter' | 'main' | 'dessert' | 'fastfood'): number {
    const courseMeals = getMealsByType(courseType);
    
    if (courseMeals.length === 0) {
      return 0;
    }

    let totalPrice = 0;
    // Use for-in loop to iterate through course meals
    for (let i in courseMeals) {
      totalPrice += parseFloat(courseMeals[i].price);
    }

    return totalPrice / courseMeals.length;
  }

  // Function to calculate average prices by course type
  function calculateAveragePrices(): Record<string, number> {
    const courseTypes: ('starter' | 'main' | 'dessert' | 'fastfood')[] = ['starter', 'main', 'dessert', 'fastfood'];
    const averages: Record<string, number> = {};

    // Use for loop to iterate through course types
    for (let i = 0; i < courseTypes.length; i++) {
      const courseType = courseTypes[i];
      averages[courseType] = calculateAveragePriceForType(courseType);
    }

    return averages;
  }

  // Calculate average prices
  const averagePrices = calculateAveragePrices();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>🍽️ Food Menu</Text>

        {/* AVERAGE PRICES BY COURSE */}
        <View style={styles.averagePricesContainer}>
          <Text style={styles.averagePricesTitle}>📊 Average Prices by Course</Text>
          <View style={styles.averagePricesGrid}>
            {Object.keys(averagePrices).map((courseType) => {
              const avgPrice = averagePrices[courseType];
              const courseCount = meals.filter(m => m.type === courseType).length;
              return (
                <View key={courseType} style={styles.averagePriceCard}>
                  <Text style={styles.averagePriceLabel}>
                    {courseType.charAt(0).toUpperCase() + courseType.slice(1)}
                  </Text>
                  {courseCount > 0 ? (
                    <Text style={styles.averagePriceValue}>${avgPrice.toFixed(2)}</Text>
                  ) : (
                    <Text style={styles.averagePriceValue}>N/A</Text>
                  )}
                  <Text style={styles.averagePriceCount}>({courseCount} items)</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* SEARCH */}
        <TextInput
          placeholder="Search by meal name..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {/* MEALS LIST */}
        <Animated.View style={{ opacity: fadeAnim }}>
          {filteredMeals.map((meal, i) => (
            <View key={i} style={styles.mealCard}>
              <Image source={{ uri: meal.image }} style={styles.mealImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealDescription}>{meal.description}</Text>
                <Text style={styles.mealPrice}>${meal.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButtonSmall}
                onPress={() => handleAddToCart(meal)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.View>

        {/* CART TOTAL */}
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>🛒 Total Items: {cart.length}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ====== ADD MEAL SCREEN ======
function AddMealScreen() {
  const { setMeals } = useMeals();
  const [newMeal, setNewMeal] = useState({ name: '', price: '', image: '', description: '', type: 'fastfood' as 'starter' | 'main' | 'dessert' | 'fastfood' });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.price || !newMeal.image || !newMeal.description) {
      Alert.alert('Error', 'Please fill all fields including description!');
      return;
    }
    setMeals((prevMeals) => [...prevMeals, { ...newMeal }]);
    setNewMeal({ name: '', price: '', image: '', description: '', type: 'fastfood' });
    Alert.alert('Added', 'New meal added successfully!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>➕ Add New Meal</Text>

        <View style={styles.addMealContainer}>
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
          <TextInput
            placeholder="Image URL"
            value={newMeal.image}
            onChangeText={text => setNewMeal({ ...newMeal, image: text })}
            style={styles.input}
          />
          {/* CATEGORY SELECTION */}
          <Text style={styles.categoryLabel}>Category:</Text>
          <View style={styles.categoryContainer}>
            {(['starter', 'main', 'fastfood', 'dessert'] as const).map((type) => (
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
      </ScrollView>
    </SafeAreaView>
  );
}

// ====== FILTER SCREEN ======
function FilterScreen() {
  const { filterType, setFilterType, search, setSearch } = useMeals();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>🔍 Filter Meals</Text>

        {/* SEARCH */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Search</Text>
          <TextInput
            placeholder="Search by meal name..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* FILTER BY CATEGORY */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Filter by Category</Text>
          <View style={styles.filterContainer}>
            {['all', 'starter', 'main', 'fastfood', 'dessert'].map((type, i) => (
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

        {/* ACTIVE FILTERS INFO */}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ====== TAB NAVIGATOR ======
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff7f50',
        tabBarInactiveTintColor: '#gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Text style={styles.tabIcon}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="AddMeal"
        component={AddMealScreen}
        options={{
          tabBarLabel: 'Add Meal',
          tabBarIcon: () => <Text style={styles.tabIcon}>➕</Text>,
        }}
      />
      <Tab.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          tabBarLabel: 'Filter',
          tabBarIcon: () => <Text style={styles.tabIcon}>🔍</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// ====== APP ======
export default function App() {
  return (
    <SafeAreaProvider>
      <MealsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </MealsProvider>
    </SafeAreaProvider>
  );
}

// ====== STYLES ======
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 },
  button: { backgroundColor: '#ff7f50', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  container: { backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 15 },
  mealCard: { flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 15, padding: 10, marginBottom: 10, alignItems: 'center' },
  mealImage: { width: 80, height: 80, borderRadius: 15, marginRight: 10 },
  mealName: { fontSize: 16, fontWeight: 'bold' },
  mealDescription: { fontSize: 12, color: '#666', marginTop: 2 },
  mealPrice: { color: '#ff7f50', fontWeight: 'bold', marginTop: 5 },
  addMealContainer: { marginVertical: 20 },
  addMealTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  categoryLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 5 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  categoryButton: { borderWidth: 1, borderColor: '#ff7f50', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 15, marginRight: 8, marginBottom: 8 },
  activeCategoryButton: { backgroundColor: '#ff7f50' },
  categoryButtonText: { color: '#000', fontSize: 12 },
  activeCategoryButtonText: { color: '#fff' },
  addButtonMain: { backgroundColor: '#ff7f50', padding: 12, borderRadius: 10, alignItems: 'center' },
  addButtonSmall: { backgroundColor: '#ff7f50', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  filterContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 10 },
  filterButton: { borderWidth: 1, borderColor: '#ff7f50', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 15, marginBottom: 5 },
  activeFilter: { backgroundColor: '#ff7f50' },
  filterText: { color: '#000' },
  activeFilterText: { color: '#fff' },
  cartContainer: { backgroundColor: '#fff0e6', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  cartText: { fontSize: 18, fontWeight: 'bold', color: '#ff7f50' },
  averagePricesContainer: { backgroundColor: '#f0f8ff', padding: 15, borderRadius: 10, marginBottom: 15 },
  averagePricesTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333', textAlign: 'center' },
  averagePricesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  averagePriceCard: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 8, 
    minWidth: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  averagePriceLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 4 },
  averagePriceValue: { fontSize: 18, fontWeight: 'bold', color: '#ff7f50', marginBottom: 2 },
  averagePriceCount: { fontSize: 10, color: '#999' },
  filterSection: { marginBottom: 20 },
  filterSectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
  filterInfoContainer: { backgroundColor: '#f0f8ff', padding: 15, borderRadius: 10, marginTop: 20 },
  filterInfoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  filterInfoText: { fontSize: 14, color: '#666', marginBottom: 4 },
  tabIcon: { fontSize: 24 },
});
