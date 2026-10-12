My name is Cedrick Manzi.

# CMPortfolio

**Student:** Cedrick Manzi  
**Registration Number:** 25/27196  
**Verification Code:** MOB-A2-7196  
**Course:** SWE3409 Mobile Application Development  
**Institution:** INES-Ruhengeri

## 1. App Purpose

CMPortfolio is a mobile portfolio application that presents my personal profile, skills, education, and software projects.

## 2. Main Features

- Home screen with my personal introduction.
- Skills and education/training timeline.
- Project list with individual project detail screens.
- Editable profile headline, short bio, primary skill, and availability.
- Input validation with helpful error messages.
- Profile photo capture using the camera or selection from the gallery.
- Preview, replace, and remove profile photos.
- Local data persistence using AsyncStorage.
- Bottom-tab navigation and stack navigation.
- About screen showing student and application information.
- Offline access to locally stored portfolio information.

## 3. Technologies

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Expo Image Picker
- EAS Build

## 4. Installation and Setup

Install Node.js and Git, then clone this repository.

```bash
git clone https://github.com/cedrickmanzi3/MOB_A2_2527196.git
cd MOB_A2_2527196
npm install
npx expo start
```

The development server is for development and testing. The submitted Android APK is intended to run as a standalone application without Expo Go.

## 5. Android APK Build

Install or run the EAS CLI, sign in to the Expo account, and build the preview APK:

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

The build produces a downloadable Android APK when the build completes.

## 6. Testing

The application has been tested for navigation, profile editing, input validation, local data persistence, profile photo selection, camera capture, and the installed standalone Android app.

**Test device:** Google Pixel 3a  
**Android version:** 12

## 7. Release

**GitHub repository:** https://github.com/cedrickmanzi3/MOB_A2_2527196

**Release:** https://github.com/cedrickmanzi3/MOB_A2_2527196/releases
**APK download:** https://github.com/cedrickmanzi3/MOB_A2_2527196/releases/download/v1.0.0/MOB_A2_2527196.apk

## 8. Final Commit

`edc43522811392bf8af7602ceb79d1715219a2c5`

Update this hash if you make and push further changes before submission.

## 9. Known Limitations

- Portfolio data and the profile image are stored locally on the device.
- Data is not automatically synchronized between different devices.
- Camera access depends on device permissions and hardware.

## 10. Data Use

The application stores profile information and the selected profile image locally on the device to support persistence. The application does not require a remote account to display the portfolio.
