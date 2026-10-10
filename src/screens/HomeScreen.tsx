
import React, { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  defaultProfile,
  loadProfile,
  ProfileData,
} from '../storage/profileStorage';

export default function HomeScreen() {
  const [profile, setProfile] =
    useState<ProfileData>(defaultProfile);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadProfile().then((savedProfile) => {
        if (active) {
          setProfile(savedProfile);
        }
      });

      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {profile.imageUri ? (
        <Image
          source={{ uri: profile.imageUri }}
          style={styles.avatar}
          accessibilityLabel="My profile picture"
        />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.initials}>CM</Text>
        </View>
      )}

      <Text style={styles.name}>
        My name is Cedrick Manzi.
      </Text>

      <Text style={styles.headline}>
        {profile.headline}
      </Text>

      <Text style={styles.location}>
        INES Ruhengeri · Rwanda
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.description}>
          {profile.bio}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>My Primary Skill</Text>
        <Text style={styles.description}>
          {profile.primarySkill}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <Text style={styles.description}>
          {profile.availability}
        </Text>
      </View>

      <View style={styles.verificationCard}>
        <Text style={styles.verificationLabel}>
          STUDENT VERIFICATION CODE
        </Text>
        <Text style={styles.verificationCode}>
          MOB-A2-7196
        </Text>
      </View>

      <Text style={styles.footer}>
        CMPortfolio · Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  content: {
    padding: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#173B70',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    color: '#142B4A',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headline: {
    color: '#315B91',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  location: {
    color: '#68778C',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#173B70',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#46566B',
    fontSize: 15,
    lineHeight: 24,
  },
  verificationCard: {
    backgroundColor: '#E2EAF7',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  verificationLabel: {
    color: '#46566B',
    fontSize: 12,
    fontWeight: '600',
  },
  verificationCode: {
    color: '#173B70',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  footer: {
    color: '#7B8798',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});
