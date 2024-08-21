# CS50 Final Project: On-Track

## On Track is a sleek, minimalistic to-do application built using Electron and Vite for React. This application not only helps you manage your daily tasks efficiently but also brings a touch of beauty to your workflow by integrating with the Unsplash API to display stunning, random images as backgrounds. The app also leverages Firebase Firestore as a backend to store your tasks securely in the cloud, ensuring that your to-dos are accessible anytime and anywhere.

## Features

- **Task Management**: Add, delete, and mark tasks as completed with an easy-to-use interface.
- **Beautiful Backgrounds**: Each time you open the app, a new random image from Unsplash graces the background, adding visual appeal to your to-do list.
- **Cloud Storage**: Your tasks are stored in Firebase Firestore, allowing for persistence and access across different devices.
- **Real-time Clock**: The app features a real-time clock to help you stay aware of the time while managing your tasks.

## Tech Stack

- **Electron**: Provides the framework to build a cross-platform desktop application using web technologies.
- **Vite**: A fast and modern build tool that powers the React frontend.
- **React**: Used to build the user interface of the application.
- **Firebase Firestore**: Serves as the cloud database to store and manage user tasks.
- **Unsplash API**: Provides beautiful, random images to be used as the background.

## Installation

To get started with On Track, follow these steps:

1. **Clone the repository:**

   ```bash
   $ git clone https://github.com/yourusername/on-track.git
   $ cd on-track
   $ npm install
   ```
2. **Create a `.env` file for your API keys**
    VITE_UNSPLASH_API_KEY=your_unsplash_api_key_here
    VITE_FIREBASE_API_KEY=your_firebase_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
    VITE_FIREBASE_APP_ID=your_firebase_app_id_here


### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## Usage
**Once you have the app up and running, you can:** 
- Add Tasks: Click the "+" button to add a new task. Enter the task description and hit "Add" to save it.
- Delete Tasks: Select the tasks you wish to delete by checking the box next to them, then click "Clear" to remove them from the list.
- Mark as Complete: Check the box next to a task to mark it as complete. The task will appear with a strikethrough.
- Enjoy Beautiful Images: Every time you open the app, enjoy a new, randomly selected background image from Unsplash.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.
