# Food Menu App — Project Report

## Project Summary
This project is a modern mobile Food Menu App built with React Native and Expo as part of my (ST10477069) coursework. The app allows users to log in, browse a menu of meals with images and categories, add their own custom meals, filter and search the menu, and manage a dynamic cart—all inside a polished, animated mobile UI. The project demonstrates my skills in building a user-friendly, interactive, and scalable app tailored for practical food-service or cafe scenarios.

## Main Features
- **Login system** (simulated, no backend)
- **Home/Menu browsing:** View meals with category, description, and image. Smooth animation on load.
- **Add Meal:** Add new custom meals (with name, description, price, image, category).
- **Responsive Filtering/Search:** Filter menu by category and search by name, combined for precise, real-time menu results.
- **Cart Functionality:**
  - Tap "+" to add any meal to your cart.
  - Button turns to a green checkmark and disables for added items for instant feedback and to prevent duplicates.
- **Tab Bar Navigation:**
  - Uses real vector icons (Ionicons) for a native app feel.
  - Distinct tabs for Home, Manage Menu, and Filter.
- **Modern, responsive UI:**
  - Scrollable and touch-friendly layouts
  - Clean, consistent color theme and typography
  - Cards with rounded corners, uniform spacing, and readable fonts
  - Icon-based headers for key sections
- **Smooth animations:**
  - Animated appearance of meal cards for professional UX
  - Button state transitions for clarity

## Improvements / Custom Features Added
Below are the key enhancements and deliberate choices I made:
- Replaced static header emojis with modern Ionicons in tab bar and page headers for a real “app” look
- **Converted tabBarIcon:** uses `Ionicons` and changes icons when tab is focused (filled/outline variant)
- Meal cards and management views show high-quality food images for each item, not just icons
- **+ Button behavior:** When you add a meal, the button becomes a green checkmark and is disabled—instant feedback, no alert popups
- **Cart total display removed** — streamlined the UI as requested
- Expanded seed data descriptions for a more appetizing and realistic demo
- Centralized all hard-coded UI labels and icons for easier maintenance
- All app data handled with clean React state/hooks (no Redux for simplicity)
- Typed all data using TypeScript for safety and maintainability

## Technologies Used
- **React Native** and **Expo** for the app
- **TypeScript** for safe and robust code
- **@expo/vector-icons** (Ionicons) for modern icons
- **React Navigation** for seamless tab/page routing

## How to Run
1. Ensure [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) are installed
2. Clone this repo and `cd` into the directory.
3. Run `npm install` (or `yarn`)
4. Start the app: `npm start` (or `expo start`)
5. Use an emulator/device with Expo Go to experience the UI

## Developer, Student Number & Links
**Osamah Khaled Al-Batati**  
Student #: ST10477069  
[Assignment Repository](https://github.com/VCCT-MAST5112-2025-G1/ST10477069-POE2-MAST)  
[Demo Walkthrough Video](https://youtu.be/GCBeh8r3bSE?si=IogcxfFQ3hjYCWdJ)

## Additional Notes
- The UI is designed with accessibility, speed, and clarity in mind.
- The app structure is scalable—new menu categories or features can be added with minimal refactor.
- My approach focused both on user experience and code clarity so reviewers and users can quickly understand and extend the codebase.
