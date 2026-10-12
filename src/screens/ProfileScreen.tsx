
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
  defaultProfile,
  loadProfile,
  saveProfile,
  ProfileData,
} from '../storage/profileStorage';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileData, string>>
  >({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadProfile()
      .then(setProfile)
      .catch(() => Alert.alert('Error', 'Could not load your profile.'))
      .finally(() => setLoaded(true));
  }, []);

  function updateField(field: keyof ProfileData, value: string) {
    setProfile((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof ProfileData, string>> = {};

    if (profile.headline.trim().length < 5) {
      nextErrors.headline = 'Headline must contain at least 5 characters.';
    }

    if (profile.bio.trim().length < 20) {
      nextErrors.bio = 'Biography must contain at least 20 characters.';
    }

    if (!profile.primarySkill.trim()) {
      nextErrors.primarySkill = 'Please enter your primary skill.';
    }

    if (!profile.availability.trim()) {
      nextErrors.availability = 'Please enter your availability.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }


async function choosePhoto() {
  function savePickedPhoto(result: ImagePicker.ImagePickerResult) {
    if (result.canceled) {
      return;
    }

    const imageUri = result.assets[0]?.uri;

    if (!imageUri) {
      Alert.alert('Photo error', 'No picture was selected.');
      return;
    }

    void (async () => {
      try {
        const updated = { ...profile, imageUri };
        await saveProfile(updated);
        setProfile(updated);
        Alert.alert('Photo updated', 'Your profile picture has been saved.');
      } catch {
        Alert.alert('Save failed', 'Could not save your profile picture.');
      }
    })();
  }

  async function takePhoto() {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Camera permission needed',
          'Allow camera access in your phone settings to take a profile picture.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      savePickedPhoto(result);
    } catch {
      Alert.alert('Camera error', 'Could not take a picture.');
    }
  }

  async function chooseFromGallery() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission needed',
          'Allow photo access in your phone settings to select a picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      savePickedPhoto(result);
    } catch {
      Alert.alert('Photo error', 'Could not select a picture.');
    }
  }

  Alert.alert('Profile Picture', 'How would you like to add your photo?', [
    { text: 'Take Photo', onPress: () => void takePhoto() },
    { text: 'Choose from Gallery', onPress: () => void chooseFromGallery() },
    { text: 'Cancel', style: 'cancel' },
  ]);
}


  async function removePhoto() {
    const updated = { ...profile, imageUri: null };

    try {
      await saveProfile(updated);
      setProfile(updated);
      Alert.alert('Photo removed', 'Your profile picture has been removed.');
    } catch {
      Alert.alert('Save failed', 'Could not save the photo removal.');
    }
  }

  async function handleSave() {
    if (!validate()) {
      Alert.alert('Check your details', 'Please correct the errors.');
      return;
    }

    try {
      await saveProfile(profile);
      Alert.alert('Success', 'Your profile has been saved.');
    } catch {
      Alert.alert('Save failed', 'Could not save your profile.');
    }
  }

  async function handleReset() {
    try {
      await saveProfile(defaultProfile);
      setProfile(defaultProfile);
      setErrors({});
      Alert.alert('Reset complete', 'Your profile has been reset.');
    } catch {
      Alert.alert('Reset failed', 'Could not reset your profile.');
    }
  }

  if (!loaded) {
    return (
      <View style={styles.center}>
        <Text>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.photoSection}>
        {profile.imageUri ? (
          <Image
            source={{ uri: profile.imageUri }}
            style={styles.photo}
            accessibilityLabel="Selected profile picture"
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoInitials}>CM</Text>
          </View>
        )}

        <Pressable style={styles.photoButton} onPress={choosePhoto}>
          <Text style={styles.saveText}>
            {profile.imageUri ? 'Replace Photo' : 'Choose Profile Photo'}
          </Text>
        </Pressable>

        {profile.imageUri ? (
          <Pressable style={styles.resetButton} onPress={removePhoto}>
            <Text style={styles.resetText}>Remove Photo</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.title}>Edit My Profile</Text>
      <Text style={styles.intro}>
        Update your details and save them on this device.
      </Text>

      <Text style={styles.label}>Professional headline</Text>
      <TextInput
        style={styles.input}
        value={profile.headline}
        onChangeText={(text) => updateField('headline', text)}
        placeholder="e.g. Software Engineering Student"
      />
      {errors.headline ? (
        <Text style={styles.error}>{errors.headline}</Text>
      ) : null}

      <Text style={styles.label}>Short biography</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={profile.bio}
        onChangeText={(text) => updateField('bio', text)}
        placeholder="Write a short introduction..."
        multiline
        numberOfLines={4}
      />
      {errors.bio ? <Text style={styles.error}>{errors.bio}</Text> : null}

      <Text style={styles.label}>Primary skill</Text>
      <TextInput
        style={styles.input}
        value={profile.primarySkill}
        onChangeText={(text) => updateField('primarySkill', text)}
        placeholder="e.g. Website Development"
      />
      {errors.primarySkill ? (
        <Text style={styles.error}>{errors.primarySkill}</Text>
      ) : null}

      <Text style={styles.label}>Availability status</Text>
      <TextInput
        style={styles.input}
        value={profile.availability}
        onChangeText={(text) => updateField('availability', text)}
        placeholder="e.g. Available for internships"
      />
      {errors.availability ? (
        <Text style={styles.error}>{errors.availability}</Text>
      ) : null}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Profile</Text>
      </Pressable>

      <Pressable style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset to Defaults</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#173B70',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoInitials: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  photoButton: {
    backgroundColor: '#173B70',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    color: '#173B70',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  intro: {
    color: '#46566B',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  label: {
    color: '#173B70',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#142B4A',
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: '#B42318',
    fontSize: 13,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#173B70',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#173B70',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  resetText: {
    color: '#173B70',
    fontWeight: '600',
    fontSize: 15,
  },
});
