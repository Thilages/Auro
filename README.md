# Aora  

Aora is a modern, video-sharing mobile application where users can upload, browse, and interact with AI-generated videos.  

---

## 🛠 **Tech Stack**  

- **React Native**: For building a cross-platform mobile application.  
- **NativeWind**: Used for responsive and dynamic styling with utility-first design principles.  
- **Appwrite**: Backend services for authentication, database management, and file storage.  

---

## 📂 **Project Structure**  

- **`/src`**: Contains all source code files for the application.  
  - **`/components`**: Modular and reusable UI components.  
  - **`/screens`**: Individual screens like Home, Profile, and Upload.  
  - **`/navigation`**: Configuration for navigation between screens.  
  - **`/services`**: API calls and Appwrite configuration files.  
  - **`/styles`**: Global styles for consistent design.  

---

## 🖥️ **Key Features**  

- **User Authentication**: Secure login system powered by Appwrite.  
- **Video Uploads**: Users can upload AI-generated videos directly from their devices.  
- **Dynamic Home Feed**: Browse a list of uploaded videos with smooth animations.  
- **Search Functionality**: Find videos easily with an integrated search bar.  
- **User Profiles**: Displays uploaded videos, follower count, and other stats.  

---

## 🛠️ **Getting Started**  

Follow these steps to set up the Aora app locally:  

### 1. Clone the repository  
```bash  
git clone https://github.com/adrianhajdin/aora.git  
```  

### 2. Navigate to the project directory  
```bash  
cd aora  
```  

### 3. Install dependencies  
```bash  
npm install  
```  

### 4. Configure Appwrite  
- Set up an Appwrite instance and configure authentication and storage.  
- Update the Appwrite project credentials in the `services/appwrite.js` file.  

### 5. Run the application  
For Android:  
```bash  
npm run android  
```  
For iOS:  
```bash  
npm run ios  
```  

---

## 🚀 **Deployment**  

Aora is designed to run on both Android and iOS platforms. Use Expo or React Native CLI for deployment.  

---

## 🌟 **Contributing**  

Contributions are welcome!  

1. Fork the repository.  
2. Create a new branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Make changes and commit:  
   ```bash  
   git commit -m 'Add feature'  
   ```  
4. Push the changes:  
   ```bash  
   git push origin feature-name  
   ```  
5. Open a pull request.  

---

## 📜 **License**  

This project is licensed under the **MIT License**.  

