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
        {/* Hero Section with Background Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1511818966892-d612672e2540?w=800&h=400&fit=crop' }}
            style={styles.heroBackground}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              Welcome to Lumina
            </Text>
            <Text style={styles.heroSubtitle}>
              Discover architectural excellence
            </Text>
          </View>
        </View>

        {/* Featured Categories Grid */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore</Text>
          <View style={styles.categoriesGrid}>
            {[
              { name: 'Modern', image: 'https://images.unsplash.com/photo-1511818966892-d612672e2540?w=200&h=200&fit=crop' },
              { name: 'Sustainable', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
              { name: 'Brutalist', image: 'https://images.unsplash.com/photo-1520637736862-4d197d17c72a?w=200&h=200&fit=crop' },
              { name: 'Urban', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop' },
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => (navigation as any).navigate('CategoryFeed', { categoryId: (index + 1).toString() })}
              >
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    height: 200,
    marginHorizontal: 12,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroBackground: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 56) / 2,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
  },
  categoryName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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