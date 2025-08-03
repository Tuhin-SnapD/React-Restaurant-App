# 🍽️ L'Étoile Restaurant - React Frontend

A sophisticated, modern React application for a fine dining restaurant with elegant UI/UX design, Redux state management, and seamless user interactions.

![Landing Page](landing.png)

![React](https://img.shields.io/badge/React-17.0.2-blue.svg)
![Redux](https://img.shields.io/badge/Redux-4.0.5-purple.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.0.0-7952B3.svg)
![React Router](https://img.shields.io/badge/React%20Router-5.3.4-red.svg)

**🌐 GitHub Repository:** [https://github.com/Tuhin-SnapD/React-Restaurant-App](https://github.com/Tuhin-SnapD/React-Restaurant-App)

## ✨ Features

### 🎨 **Sophisticated UI/UX Design**
- Modern, elegant interface with sophisticated styling
- Responsive design that works on all devices
- Smooth animations and transitions
- Professional color scheme and typography

### 🍽️ **Restaurant Management**
- **Interactive Menu**: Browse dishes with detailed descriptions, pricing, and ratings
- **Dish Details**: Comprehensive dish information with user reviews and ratings
- **Featured Items**: Highlight special dishes and promotions
- **Category Filtering**: Filter dishes by appetizers, mains, and desserts

### 👥 **User Engagement**
- **Review System**: Users can rate and review dishes
- **Contact Form**: Sophisticated feedback submission system
- **About Section**: Information about restaurant leadership and history
- **Reservation System**: Contact information for bookings

### 🔧 **Technical Excellence**
- **Redux State Management**: Centralized state management with Redux
- **React Router**: Client-side routing for seamless navigation
- **Form Validation**: Comprehensive form handling with react-hook-form
- **Error Handling**: Robust error handling and loading states
- **Performance Optimized**: Efficient rendering and data management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tuhin-SnapD/React-Restaurant-App.git
   cd React-Restaurant-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── AboutComponent.js
│   ├── ContactComponent.js
│   ├── DishdetailComponent.js
│   ├── FooterComponent.js
│   ├── HeaderComponent.js
│   ├── HomeComponent.js
│   ├── LoadingComponent.js
│   ├── MainComponent.js
│   └── MenuComponent.js
├── redux/              # Redux store and actions
│   ├── ActionCreators.js
│   ├── ActionTypes.js
│   ├── comments.js
│   ├── configureStore.js
│   ├── dishes.js
│   ├── forms.js
│   ├── leaders.js
│   └── promotions.js
├── shared/             # Shared utilities
│   └── baseUrl.js
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 Key Components

### **MainComponent.js**
- Central routing hub with Redux integration
- Manages data fetching and state distribution
- Handles navigation and component rendering

### **MenuComponent.js**
- Displays restaurant menu with filtering capabilities
- Interactive dish cards with ratings and categories
- Responsive grid layout with sophisticated styling

### **DishdetailComponent.js**
- Detailed dish information display
- User review and rating system
- Comment submission functionality

### **ContactComponent.js**
- Sophisticated contact form with validation
- Multiple feedback types (compliment, suggestion, complaint)
- Professional styling with success notifications

## 🔧 Configuration

### Backend API Configuration
The application is configured to connect to a backend API. Update the base URL in `src/shared/baseUrl.js`:

```javascript
export const baseUrl = 'http://localhost:8000/';
```

### Environment Variables
Create a `.env` file in the root directory for environment-specific configurations:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Various Platforms

#### **Netlify**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

#### **Vercel**
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

#### **GitHub Pages**
1. Add homepage to package.json: `"homepage": "https://username.github.io/repo-name"`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy scripts to package.json
4. Deploy: `npm run deploy`

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## 📦 Dependencies

### Core Dependencies
- **React 17.0.2** - UI library
- **Redux 4.0.5** - State management
- **React Router 5.3.4** - Client-side routing
- **Bootstrap 4.0.0** - CSS framework
- **Reactstrap 8.9.0** - Bootstrap components for React

### Development Dependencies
- **React Scripts 5.0.0** - Build tools
- **ESLint** - Code linting
- **Jest** - Testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Prof. Jogesh Muppala** - Associate Professor at Hong Kong University of Science and Technology
- React community for excellent documentation and tools
- Bootstrap team for the responsive framework

## 📞 Support

For support and questions:
- 📧 Email: reservations@letoile.com
- 📱 Phone: +1 (555) 123-4567
- 🌐 Website: [L'Étoile Restaurant](https://letoile-restaurant.com)

---

**Made with ❤️ for the culinary arts**
    
