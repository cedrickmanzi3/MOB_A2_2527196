
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProfileData = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: string;
  imageUri: string | null;
};

const STORAGE_KEY = '@CMPortfolio/profile';

export const defaultProfile: ProfileData = {
  headline: 'Software Engineering Student',
  bio: 'I am a student at INES Ruhengeri who enjoys learning technology and building useful applications.',
  primarySkill: 'Website Development',
  availability: 'Available for learning opportunities',
  imageUri: null,
};

export async function saveProfile(profile: ProfileData) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function loadProfile(): Promise<ProfileData> {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    if (saved) {
      return { ...defaultProfile, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.log('Could not load profile:', error);
  }

  return defaultProfile;
}
