#  Food Menu App

A modern, elegant mobile application for browsing, managing, and ordering restaurant meals—bringing delicious food experiences directly to your mobile device with a clean, intuitive interface.

---

##  About

**Food Menu App** is a comprehensive React Native application designed to streamline the restaurant menu experience. Built with modern mobile development practices, this app allows users to browse meals, filter by category, search for specific dishes, and manage menu items—all within a beautifully designed, responsive interface.

**Our Mission:**
To create a seamless, user-friendly mobile experience that makes restaurant menu browsing and management effortless, whether you're a customer exploring options or a restaurant owner managing your offerings.

---

##  Features

###  Core Screens
- **Login Screen:** Simple authentication with email and password validation
- **Home Screen:** 
  - Browse all meals with images, descriptions, and prices
  - View average prices by course type (Starter, Main, Dessert)
  - Real-time search functionality
  - Add meals to cart with visual feedback
- **Manage Menu Screen:**
  - Add new meals with custom images (from device gallery)
  - Edit meal details (name, description, price, category)
  - Remove meals from the menu
  - View all current menu items
- **Filter Screen:**
  - Advanced filtering by category
  - Combined search and filter functionality
  - Active filter indicators
  - Real-time results count

###  User Experience & Design
- **Modern Tab Navigation:** Ionicons-based tab bar with active/inactive states
- **Smooth Animations:** Fade-in effects for meal cards
- **Visual Feedback:** 
  - Add-to-cart button transforms to green checkmark when item is added
  - Disabled state prevents duplicate additions
- **Responsive Layout:** Mobile-optimized with clean spacing and typography
- **Image Support:** Real food images from URLs or device gallery

###  Interactive Features
- **Smart Cart System:** 
  - One-click add to cart
  - Visual confirmation with checkmark
  - Prevents duplicate additions
- **Advanced Search:** 
  - Real-time filtering as you type
  - Combined with category filters for precise results
- **Image Picker:** 
  - Select photos directly from device gallery
  - Preview before adding to menu
- **Dynamic Calculations:** 
  - Average price calculations by course type
  - Real-time updates as menu changes

---

##  Technologies Used

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation and routing
- **@expo/vector-icons** - Modern icon library (Ionicons)
- **expo-image-picker** - Image selection from device

### Development Tools
- **TypeScript** - Static type checking
- **ESLint** - Code quality
- **Expo CLI** - Development workflow

---

##  Project Structure

```
ST10477069-POE2-MAST/
│
├── App.tsx                    # Main application entry point
├── navigation.tsx             # Navigation configuration
├── styles.ts                  # Centralized stylesheet
├── index.ts                   # Expo entry point
│
├── screens/                   # Screen components
│   ├── LoginScreen.tsx        # Authentication screen
│   ├── HomeScreen.tsx         # Main menu browsing screen
│   ├── AddMealScreen.tsx      # Menu management screen
│   └── FilterScreen.tsx       # Filter and search screen
│
├── components/                # Reusable UI components
│   ├── AveragePriceCard.tsx   # Average price display card
│   └── MealCard.tsx           # Meal item card component
│
├── utils/                     # Utility functions and context
│   ├── types.ts               # TypeScript type definitions
│   └── MealsContext.tsx       # Global state management
│
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

---

##  Getting Started

### Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager
- **Expo CLI** (install globally: `npm install -g expo-cli`)
- **Expo Go app** on your mobile device (for testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VCCT-MAST5112-2025-G1/ST10477069-POE2-MAST.git
   cd ST10477069-POE2-MAST
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device:**
   - Scan the QR code with Expo Go (iOS) or Camera app (Android)
   - Or press `i` for iOS simulator, `a` for Android emulator, `w` for web

---

##  Usage Guide

### Navigation
- **Login:** Enter any email and password to access the app
- **Home Tab:** Browse all meals, view average prices, and search
- **Manage Menu Tab:** Add, edit, or remove menu items
- **Filter Tab:** Use advanced filtering and search options

### Adding Meals
1. Navigate to "Manage Menu" tab
2. Fill in meal details (name, description, price)
3. Tap "Add Photo" to select an image from your device
4. Choose category (Starter, Main, or Dessert)
5. Tap "Add Meal" to save

### Adding to Cart
1. Browse meals on Home or Filter screen
2. Tap the "+" button on any meal card
3. Button changes to green checkmark ✓
4. Item is added to cart (button becomes disabled)

### Filtering Meals
1. Go to Filter screen
2. Use search bar to filter by name
3. Tap category buttons to filter by type
4. View active filters and result count
5. Clear filters by selecting "All" category

---

##  Configuration

### Image Picker Permissions
The app requires camera/gallery permissions for image selection. These are handled automatically by Expo on first use.

### State Management
All app state is managed through React Context (`MealsContext`), providing:
- Global meal list
- Cart state
- Filter and search state
- Easy state updates across components

---

##  Key Features Breakdown

### 1. Component Architecture
✅ **Reusable Components:**
- `MealCard` - Displays meal information with add-to-cart functionality
- `AveragePriceCard` - Shows average price statistics by course type

### 2. State Management
✅ **Context API:**
- Centralized state for meals, cart, filters, and search
- Easy state updates across all screens
- Type-safe with TypeScript

### 3. Navigation
✅ **React Navigation:**
- Stack navigator for login/main app flow
- Tab navigator for main app sections
- Smooth transitions and native feel

### 4. User Interface
✅ **Modern Design:**
- Consistent color scheme (#ff7f50 primary)
- Responsive layouts
- Smooth animations
- Icon-based navigation

### 5. Data Management
✅ **Dynamic Features:**
- Real-time search and filtering
- Average price calculations
- Cart management
- Menu item CRUD operations

---

##  Browser/Platform Compatibility

✅ **iOS** (via Expo Go or standalone build)  
✅ **Android** (via Expo Go or standalone build)  
✅ **Web** (via Expo web support)

---

##  Development Notes

### Code Organization
- **Separation of Concerns:** Screens, components, utilities, and styles are organized in separate directories
- **Reusable Components:** Common UI elements extracted into reusable components
- **Type Safety:** Full TypeScript implementation for better code quality
- **Centralized Styles:** All styles in single `styles.ts` file for easy maintenance

### Best Practices
- TypeScript for type safety
- Component-based architecture
- Context API for state management
- Clean code structure
- Reusable UI components
- Mobile-first responsive design

---

##  Developer Information

**Developed By:** Osamah Khaled Al-Batati  
**Student Number:** ST10477069  
**Course:** MAST5112 - Mobile Application Development

---

##  Future Enhancements

- [ ] Shopping cart checkout functionality
- [ ] User authentication with backend
- [ ] Order history
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Favorites/wishlist feature
- [ ] Meal reviews and ratings
- [ ] Admin dashboard
- [ ] Backend API integration
- [ ] Offline mode support

---

<<<<<<< HEAD
## 📚 References

### Core Technologies
1. Meta. (2024). *React Native - A framework for building native apps using React*. React Native. https://reactnative.dev/

2. Expo. (2024). *Expo Documentation*. Expo. https://docs.expo.dev/

3. Microsoft. (2024). *TypeScript - JavaScript with syntax for types*. TypeScript. https://www.typescriptlang.org/

### Libraries and Dependencies
4. React Navigation. (2024). *React Navigation - Routing and navigation for React Native apps*. React Navigation. https://reactnavigation.org/

5. Expo. (2024). *@expo/vector-icons - Icon library for Expo and React Native*. Expo. https://docs.expo.dev/guides/icons/

6. Expo. (2024). *expo-image-picker - Provides access to the system's UI for selecting images*. Expo. https://docs.expo.dev/versions/latest/sdk/image-picker/

7. React Native Community. (2024). *react-native-safe-area-context - A flexible way to handle safe areas*. GitHub. https://github.com/th3rdwave/react-native-safe-area-context

8. React Native Community. (2024). *react-native-screens - Native navigation primitives*. GitHub. https://github.com/software-mansion/react-native-screens

### Development Tools
9. Expo. (2024). *Expo CLI - Command line tools for Expo*. Expo. https://docs.expo.dev/more/expo-cli/

10. Node.js. (2024). *Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine*. Node.js. https://nodejs.org/

### Documentation and Learning Resources
11. React Native Documentation. (2024). *React Native - Learn once, write anywhere*. React Native. https://reactnative.dev/docs/getting-started

12. Expo Documentation. (2024). *Expo - The fastest way to build an app*. Expo. https://docs.expo.dev/

13. TypeScript Handbook. (2024). *TypeScript - Handbook*. TypeScript. https://www.typescriptlang.org/docs/handbook/intro.html

14. React Navigation Documentation. (2024). *Getting Started - React Navigation*. React Navigation. https://reactnavigation.org/docs/getting-started

### Design and UI Resources
15. Ionicons. (2024). *Ionicons - The premium icon pack*. Ionicons. https://ionic.io/ionicons

16. React Native. (2024). *StyleSheet - A StyleSheet is an abstraction similar to CSS StyleSheets*. React Native. https://reactnative.dev/docs/stylesheet

### Best Practices and Patterns
17. React. (2024). *Context API - React Context provides a way to pass data through the component tree*. React. https://react.dev/reference/react/createContext

18. React Native. (2024). *Component Best Practices - Building reusable components*. React Native. https://reactnative.dev/docs/components-and-apis

---

## 📄 License
=======
##  License
>>>>>>> 380ad9fc850a15ad86dcc9790536d3d2813e8b05

This project is part of an academic assignment for MAST5112.

---

##  Acknowledgments

Built with React Native, Expo, and modern mobile development best practices. Special thanks to the React Native and Expo communities for excellent documentation and tools.

---

**Built with ❤️ for food lovers everywhere**

© 2025 Food Menu App — Crafted with passion and attention to detail.

---


##  Links

- **GitHub Repository:** [https://github.com/VCCT-MAST5112-2025-G1/ST10477069-POE-MAST)
- **Github [https://github.com/VCCT-MAST5112-2025-G1/ST10477069-POE-MAST.git)
- **Demo Video:** [YouTube Walkthrough](https://www.youtube.com/watch?v=LcuBP8kKpXU)

---

**OSAMAH KHALED AL_BATATI - ST10477069 - POE**
