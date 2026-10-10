
import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import ProfileScreen from './src/screens/ProfileScreen';

import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SimpleScreen({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

function SkillsScreen() {
  const skills = [
    'Website Development',
    'TypeScript and JavaScript',
    'React Native',
    'Problem Solving',
    'Teamwork',
  ];

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.title}>My Skills</Text>
      <Text style={styles.description}>
        Technologies and skills I am developing.
      </Text>
      {skills.map((skill) => (
        <View key={skill} style={styles.card}>
          <Text style={styles.cardText}>{skill}</Text>
        </View>
      ))}
      <Text style={styles.subtitle}>Education</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>INES Ruhengeri</Text>
        <Text style={styles.description}>
          Software Engineering · Current studies
        </Text>
      </View>
    </ScrollView>
  );
}

function ProjectsScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.page}>
      <Text style={styles.title}>My Projects</Text>
      <Text style={styles.description}>
        Explore my student development projects.
      </Text>

      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('ProjectDetails', {
          title: 'CMPortfolio',
          problem: 'A personal portfolio needs to present a student clearly.',
          contribution: 'Designed and developed a personal portfolio mobile application using React Native and Expo. Implemented profile editing, image selection, local data storage, input validation, skills and education sections, and project detail navigation. Created a user-friendly interface and tested the main application features.',
          technology: 'React Native, Expo and TypeScript',
        })}
      >
        <Text style={styles.cardText}>CMPortfolio</Text>
        <Text style={styles.description}>
          A mobile portfolio application.
        </Text>
        <Text style={styles.link}>View project details →</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('ProjectDetails', {
          title: 'Kinigi Milk Check',
          problem: 'Milk collection requires recording and checking deliveries.',
          contribution: 'Contributed to the mobile application interface for recording milk deliveries, collecting farmer and milk-quality information, and displaying delivery records. Worked on integrating the mobile application with an AI-based milk rejection risk prediction service and supporting local data storage.',
          technology: 'Expo, React Native and Python',
        })}
      >
        <Text style={styles.cardText}>Kinigi Milk Check</Text>
        <Text style={styles.description}>
          A student project for recording milk deliveries.
        </Text>
        <Text style={styles.link}>View project details →</Text>
      </Pressable>
    </ScrollView>
  );
}

function ProjectDetailsScreen({ route }: any) {
  const { title, problem, contribution, technology } = route.params;

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>Problem</Text>
      <Text style={styles.description}>{problem}</Text>

      <Text style={styles.subtitle}>My Contribution</Text>
      <Text style={styles.description}>{contribution}</Text>

      <Text style={styles.subtitle}>Technologies</Text>
      <Text style={styles.description}>{technology}</Text>
    </ScrollView>
  );
}



function AboutScreen() {
  return (
    <ScrollView style={styles.page}>
      <Text style={styles.title}>About CMPortfolio</Text>
      <Text style={styles.description}>
        Student: Cedrick Manzi
      </Text>
      <Text style={styles.description}>
        Registration: 25/27196
      </Text>
      <Text style={styles.description}>
        Verification: MOB-A2-7196
      </Text>
      <Text style={styles.description}>
        Version: 1.0.0
      </Text>
      <Text style={styles.subtitle}>Data Use</Text>
      <Text style={styles.description}>
       Data Use and Privacy

CMPortfolio stores profile information and the selected profile-picture reference locally on the device using AsyncStorage. This information is used to display and update the user's portfolio. Profile changes can be reset using the Reset to Defaults option. The app does not require a personal account or a remote database for these features. Data may be lost if the app's local storage is cleared or the app is uninstalled.
      </Text>
    </ScrollView>
  );
}




function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#173B70',
        tabBarActiveTintColor: '#173B70',
        tabBarInactiveTintColor: '#7B8798',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Portfolio"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProjectDetails"
          component={ProjectDetailsScreen}
          options={{ title: 'Project Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    padding: 20,
  },
  title: {
    color: '#173B70',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#173B70',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    color: '#46566B',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginTop: 12,
  },
  cardText: {
    color: '#173B70',
    fontSize: 17,
    fontWeight: 'bold',
  },
  link: {
    color: '#315B91',
    fontWeight: '600',
    marginTop: 10,
  },
});
