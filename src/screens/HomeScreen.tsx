import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Post } from '../components/Post';
import { mockPosts } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { colors, toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();

  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail' as never, { postId } as never);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <Ionicons name="camera" size={32} color={colors.gold} />
          <Text style={[styles.appTitle, { color: colors.gold }]}>Lumina</Text>
        </View>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Ionicons 
            name={isDarkMode ? 'sunny' : 'moon'} 
            size={24} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            Welcome to Lumina
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Discover architectural excellence, share inspiring designs, and connect with the global architecture community.
          </Text>
        </View>

        {/* Feed */}
        <View style={styles.feed}>
          {mockPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onPress={() => handlePostPress(post.id)}
            />
          ))}
          
          {/* End of feed indicator */}
          <View style={styles.endIndicator}>
            <Text style={[styles.endText, { color: colors.textSecondary }]}>
              You've reached the end of your feed
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  themeToggle: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  feed: {
    flex: 1,
  },
  endIndicator: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  endText: {
    fontSize: 14,
  },
}); 