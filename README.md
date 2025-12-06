# TeleconsultApp

A React Native mobile application for booking and conducting teleconsultation appointments with doctors. This app enables patients to schedule appointments, fill in their health concerns, make payments, and connect with doctors via video calls.

## Demo

[![Demo Video](https://img.shields.io/badge/Demo-Watch%20Video-red?style=for-the-badge&logo=google-drive)](https://drive.google.com/file/d/18OqLPoDypsjLpB9ZndT5zLiNHwlplHvg/view?usp=sharing)

**[Click here to watch the demo video](https://drive.google.com/file/d/18OqLPoDypsjLpB9ZndT5zLiNHwlplHvg/view?usp=sharing)**

## Features

- **Doctor Listing** - Browse available doctors for consultation
- **Appointment Scheduling** - Choose date and time slots for appointments
- **Patient Information** - Fill in basic info and health concerns
- **Booking Management** - View and manage your appointments
- **Payment Integration** - Complete payment for consultations
- **Video Calling** - Real-time video consultation with doctors using ZegoCloud
- **Waiting Room** - Virtual waiting room before doctor joins the call

## Tech Stack

- **React Native** 0.82.1
- **React** 19.1.1
- **TypeScript**
- **React Navigation** - Native stack navigation
- **ZegoCloud UIKit** - Video/audio calling functionality
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - UI icons

## Prerequisites

- Node.js >= 20
- React Native development environment set up ([Guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd TeleconsultApp
   ```

2. **Install dependencies**
   ```sh
   npm install
   # OR
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```sh
   bundle install
   cd ios && bundle exec pod install && cd ..
   ```

## Running the App

1. **Start Metro bundler**
   ```sh
   npm start
   # OR
   yarn start
   ```

2. **Run on Android**
   ```sh
   npm run android
   # OR
   yarn android
   ```

3. **Run on iOS**
   ```sh
   npm run ios
   # OR
   yarn ios
   ```

## Project Structure

```
TeleconsultApp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # App screens
│   └── utils/          # Utility functions
├── android/            # Android native code
├── ios/                # iOS native code
└── App.tsx             # App entry point
```

## Key Screens

| Screen | Description |
|--------|-------------|
| `DoctorListScreen` | Browse available doctors |
| `ChooseDateScreen` | Select appointment date |
| `TimeSlotScreen` | Pick available time slot |
| `BasicInfoScreen` | Enter patient information |
| `ConcernsScreen` | Describe health concerns |
| `BookingDetailsScreen` | Review booking details |
| `PaymentScreen` | Complete payment |
| `MyBookingsScreen` | View all appointments |
| `WaitingForDoctorScreen` | Wait for doctor to join |
| `CallScreen` | Video consultation |

## Scripts

```sh
npm start       # Start Metro bundler
npm run android # Build and run on Android
npm run ios     # Build and run on iOS
npm run lint    # Run ESLint
npm test        # Run tests
```

## Troubleshooting

If you encounter issues, refer to the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

## License

This project is part of an internship assignment.
