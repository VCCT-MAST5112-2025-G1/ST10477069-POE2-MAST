import React, { useState, useRef, useEffect } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ====== TYPES ======
type Meal = {
  name: string;
  price: string;
  image: string;
  type: 'starter' | 'main' | 'dessert' | 'fastfood';
};

// ====== LOGIN SCREEN ======
function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) navigation.replace('Home');
    else Alert.alert('Error', 'Please enter your email and password');
  };

  return (
    <View style={styles.loginContainer}>
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
    </View>
  );
}

// ====== HOME SCREEN ======
function HomeScreen() {
const [meals, setMeals] = useState<Meal[]>([
  { name: 'Vegetable Salad', price: '10', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', type: 'starter' },
  { name: 'Lentil Soup', price: '8', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=80&q=80', type: 'starter' },
  { name: 'Beef Burger', price: '15', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=80&q=80', type: 'fastfood' },
  { name: 'Margherita Pizza', price: '12', image: 'https://images.unsplash.com/photo-1601924928408-3e3de289a91f?auto=format&fit=crop&w=80&q=80', type: 'fastfood' },
  { name: 'Cheesecake', price: '9', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjOSkPERVYz6sVua0XzIQeUM2vxxuaX-6nQA&s', type: 'dessert' },
  { name: 'Chocolate Brownie', price: '7', image: 'https://th.bing.com/th/id/OIP.LzD5bFDUFDGJ4jcMuUtcXAHaHa?w=202&h=202&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', type: 'dessert' },
]);

  const [cart, setCart] = useState<Meal[]>([]);
  const [total, setTotal] = useState<number>(0); 
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'starter' | 'fastfood' | 'dessert'>('all');
  const [newMeal, setNewMeal] = useState({ name: '', price: '', image: '', type: 'fastfood' });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);


  useEffect(() => {
    const totalPrice = cart.reduce((sum, meal) => sum + parseFloat(meal.price), 0);
    setTotal(totalPrice);
  }, [cart]);

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.price || !newMeal.image) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }
    setMeals([...meals, { ...newMeal, type: 'fastfood' }]);
    setNewMeal({ name: '', price: '', image: '', type: 'fastfood' });
    Alert.alert('Added', 'New meal added successfully!');
  };

  const handleAddToCart = (meal: Meal) => {
    setCart([...cart, meal]);
    Alert.alert('Added', `${meal.name} added to cart!`);
  };

  const filteredMeals = meals.filter(
    m =>
      (filterType === 'all' || m.type === filterType) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🍽️ Food Menu</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Search by meal name..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* FILTER BUTTONS */}
      <View style={styles.filterContainer}>
        {['all', 'starter', 'fastfood', 'dessert'].map((type, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.filterButton, filterType === type && styles.activeFilter]}
            onPress={() => setFilterType(type as any)}
          >
            <Text style={styles.filterText}>
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ADD NEW MEAL */}
      <View style={styles.addMealContainer}>
        <Text style={styles.addMealTitle}>➕ Add New Meal</Text>
        <TextInput
          placeholder="Meal name"
          value={newMeal.name}
          onChangeText={text => setNewMeal({ ...newMeal, name: text })}
          style={styles.input}
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
        <TouchableOpacity style={styles.addButtonMain} onPress={handleAddMeal}>
          <Text style={styles.addButtonText}>Add Meal</Text>
        </TouchableOpacity>
      </View>

      {/* MEALS LIST */}
      <Animated.View style={{ opacity: fadeAnim }}>
        {filteredMeals.map((meal, i) => (
          <View key={i} style={styles.mealCard}>
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.mealName}>{meal.name}</Text>
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
        <Text style={styles.cartText}>🛒 Total: ${total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

// ====== APP ======
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ====== STYLES ======
const styles = StyleSheet.create({
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
  mealPrice: { color: '#ff7f50', fontWeight: 'bold', marginTop: 5 },
  addMealContainer: { marginVertical: 20 },
  addMealTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  addButtonMain: { backgroundColor: '#ff7f50', padding: 12, borderRadius: 10, alignItems: 'center' },
  addButtonSmall: { backgroundColor: '#ff7f50', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterButton: { borderWidth: 1, borderColor: '#ff7f50', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 15 },
  activeFilter: { backgroundColor: '#ff7f50' },
  filterText: { color: '#000' },
  cartContainer: { backgroundColor: '#fff0e6', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  cartText: { fontSize: 18, fontWeight: 'bold', color: '#ff7f50' },
});
