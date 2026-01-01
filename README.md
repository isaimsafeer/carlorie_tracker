# NutriLens AI

<div align="center">

![NutriLens AI Banner](docs/screenshots/banner.png)

**AI-Powered Nutrition Tracking Application**

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Description

**NutriLens AI** is a modern, intelligent nutrition tracking application that leverages Google Gemini AI to automatically analyze food images and extract detailed nutritional information. Simply capture a photo of your meal, and the app will identify the food items and provide accurate calorie counts, macronutrient breakdowns (protein, carbs, fats), and more.

The application features a beautiful, mobile-first interface with comprehensive dashboards, meal logging capabilities, and personalized nutrition goals. Built with React and TypeScript, NutriLens AI provides a seamless experience for tracking your daily nutrition intake.

---

## ✨ Features

- **🤖 AI-Powered Food Recognition**: Capture food photos using your device camera and get instant nutritional analysis powered by Google Gemini AI
- **📊 Comprehensive Dashboard**: Visual overview of your daily calorie intake and macronutrient distribution with interactive charts
- **📝 Meal Logging**: Track meals throughout the day with detailed entries including images, timestamps, and meal types
- **🎯 Personalized Goals**: Set and track custom daily calorie and macro goals based on your profile
- **📈 Visual Analytics**: Beautiful charts and graphs using Recharts to visualize your nutrition data
- **👤 User Profiles**: Manage your profile with age, weight, height, activity level, and fitness goals
- **📱 Mobile-Optimized**: Responsive design optimized for mobile devices with a native app-like experience
- **💾 Local Storage**: Data persistence using browser localStorage for offline access
- **🔐 Secure API Key Management**: Protected routes and secure API key handling

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Google Gemini API Key** - [Get your API key](https://makersuite.google.com/app/apikey)

### Step-by-Step Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   git clone <repository-url>
   cd nutri-folder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```
   
   Add your Gemini API key to the `.env.local` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   
   > **Note**: Replace `your_api_key_here` with your actual Google Gemini API key.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

---

## 💻 Usage

### Getting Started

1. **Launch the application** and you'll be prompted to enter your Gemini API key if not already configured.

2. **Set up your profile**:
   - Navigate to the "Me" tab
   - Enter your personal information (age, weight, height, activity level)
   - Set your fitness goals (lose, maintain, or gain weight)
   - Configure your daily calorie and macro targets

3. **Capture and analyze food**:
   - Tap the camera button (floating action button) in the bottom navigation
   - Allow camera permissions when prompted
   - Frame your food within the guide overlay
   - Tap the capture button to take a photo
   - Wait for AI analysis (typically 2-5 seconds)
   - Review the nutritional information
   - Confirm to add the meal to your log

4. **View your dashboard**:
   - Check the "Dash" tab for daily summaries
   - View calorie progress and macro breakdowns
   - Explore interactive charts and visualizations

5. **Manage your meal log**:
   - Access the "Log" tab to see all meals for today
   - Remove entries by tapping the delete icon
   - View meal details including images and timestamps

### Example Commands

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Camera Usage Tips

- Ensure good lighting for better food recognition
- Frame the food item clearly within the guide overlay
- Keep the camera steady while capturing
- For best results, capture individual food items or simple meals

---

## 📸 Screenshots

> **Note**: Add your screenshots to the `docs/screenshots/` directory and update the paths below.

### Dashboard View
![Dashboard Screenshot](docs/screenshots/dashboard.png)
*Main dashboard showing daily calorie progress and macro breakdown*

### Camera Scanner
![Camera Screenshot](docs/screenshots/camera.png)
*Food scanning interface with camera overlay*

### Analysis Result
![Analysis Screenshot](docs/screenshots/analysis.png)
*AI analysis results with nutritional information*

### Meal Log
![Meal Log Screenshot](docs/screenshots/meal-log.png)
*Daily meal log with all tracked items*

### Profile Settings
![Profile Screenshot](docs/screenshots/profile.png)
*User profile and goal configuration*

---

## 🛠️ Technologies

### Core Framework & Language
- **React** (v19.2.3) - UI library
- **TypeScript** (v5.8.2) - Type-safe JavaScript
- **Vite** (v6.2.0) - Build tool and development server

### AI & Backend
- **@google/genai** (v1.34.0) - Google Gemini AI SDK for food image analysis
- **Firebase** (v12.7.0) - Backend services (authentication, database)

### UI & Routing
- **React Router DOM** (v7.11.0) - Client-side routing
- **Recharts** (v3.6.0) - Chart library for data visualization
- **Tailwind CSS** - Utility-first CSS framework (via inline classes)

### Development Tools
- **@vitejs/plugin-react** (v5.0.0) - Vite plugin for React
- **@types/node** (v22.14.0) - TypeScript definitions for Node.js

---

## 🤝 Contributing

We welcome contributions to NutriLens AI! Please follow these guidelines:

### How to Contribute

1. **Fork the repository** and create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**:
   - Follow the existing code style and conventions
   - Write clear, descriptive commit messages
   - Add comments for complex logic

3. **Test your changes**:
   - Ensure the app runs without errors
   - Test on different devices/browsers if possible
   - Verify API integrations work correctly

4. **Commit your changes**:
   ```bash
   git commit -m "Add: description of your feature"
   ```

5. **Push to your branch**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**:
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots if UI changes are involved

### Contribution Guidelines

- **Code Style**: Follow TypeScript and React best practices
- **Naming**: Use descriptive variable and function names
- **Documentation**: Update README and code comments as needed
- **Testing**: Test thoroughly before submitting PRs
- **Issues**: Report bugs or suggest features via GitHub Issues

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 NutriLens AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

### Project Maintainer

- **Name**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [@yourusername](https://github.com/yourusername)

### Support

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/yourusername/nutrilens-ai/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/nutrilens-ai/discussions)
- 📧 **Email**: [your.email@example.com]

### Social Links

- 🌐 **Website**: [Your Website URL]
- 🐦 **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- 💼 **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing powerful image analysis capabilities
- **React Team** for the amazing React framework
- **Vite Team** for the fast build tool
- **Recharts** for beautiful chart components
- All contributors and users of NutriLens AI

---

<div align="center">

**Made with ❤️ using React, TypeScript, and AI**

⭐ Star this repo if you find it helpful!

</div>
