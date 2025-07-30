import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Post } from '../components/Post';
import { mockPosts } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { colors, toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();

  const handlePostPress = (postId: string) => {
    (navigation as any).navigate('PostDetail', { postId });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="camera" size={28} color={colors.gold} />
          <Text style={[styles.appTitle, { color: colors.gold }]}>Lumina</Text>
        </View>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <View style={[styles.themeBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
            <Ionicons 
              name={isDarkMode ? 'sunny' : 'moon'} 
              size={20} 
              color={colors.textSecondary} 
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section - Text Only */}
        <View style={[styles.heroSection, { backgroundColor: '#1a1a1a' }]}>
          <Text style={[styles.heroTitle, { color: colors.gold }]}>
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
            <View style={[styles.endBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Text style={[styles.endText, { color: colors.textSecondary }]}>
                You've reached the end
              </Text>
            </View>
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
    // No additional styling needed
  },
  themeBadge: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
    alignSelf: 'center',
  },
  feed: {
    flex: 1,
  },
  endIndicator: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  endBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  endText: {
    fontSize: 14,
  },
}); 