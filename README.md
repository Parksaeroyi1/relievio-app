📱 Frontend – Relievio App
This is the mobile frontend of the Relievio app, built with React Native Expo and connected to a MongoDB backend via fetch() requests.

🏗️ Structure
index.tsx – Main entry and home screen.

Screens are organized by features (Planner, Tracker, Profile, etc.).

🚀 Getting Started
Start the app:

bash
Copy
Edit
npx expo start
A QR code will appear in the terminal or Expo Dev Tools.

Below the QR code, copy the IP address (e.g. 192.168.1.25) and:

Replace only the IP address in all fetch('http://<ip>:8000/...) calls across the project.
It is run locally.

Scan the QR with your phone using the Expo Go app.

On first load, the screen may seem unresponsive.
👉 Tap with three fingers on the screen to activate the interface.

👤 How to Use
Sign Up:
Create your account on the sign-up screen.

Log In:
Enter your credentials to access the home screen.

Home Screen Options:

Recommended Stretch – Shows a recommended daily stretch.

Assessment – Brings you to the Planner to select a symptom/body part pair.

Reminder Setup – Schedule custom reminders.

Planner Screen:

Select one symptom + one body part, scroll to view results.

You can add results to your Tracker or try a new selection.

Tracker Screen:

View and manage all saved results from assessments.

Profile Screen:

Update your name, email, or password anytime.
