import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Post } from '../components/Post';
import { mockPosts, mockCategories } from '../data/mockData';
import { Category } from '../types';

interface RouteParams {
  categoryId: string;
}

export default function CategoryFeedScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params as RouteParams;
  
  const [refreshing, setRefreshing] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  // Find the category
  const category = mockCategories.find(c => c.id === categoryId);

  // Filter posts based on category (in a real app, this would be done on the backend)
  useEffect(() => {
    // For demo purposes, we'll show different posts based on category
    const categoryFilters = {
      '1': mockPosts.filter((_, index) => index % 3 === 0), // Modern Architecture
      '2': mockPosts.filter((_, index) => index % 3 === 1), // Sustainable Design
      '3': mockPosts.filter((_, index) => index % 3 === 2), // Brutalism
      '4': mockPosts.slice(0, 3), // Urban Planning
      '5': mockPosts.slice(1, 4), // Interior Design
      '6': mockPosts.slice(2, 5), // Landscape Architecture
    };
    
    setFilteredPosts(categoryFilters[categoryId as keyof typeof categoryFilters] || mockPosts);
  }, [categoryId]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail' as never, { postId } as never);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={colors.error} />
          <Text style={[styles.errorTitle, { color: colors.text }]}>Category Not Found</Text>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>
            The category you're looking for doesn't exist.
          </Text>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {category.name}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {formatNumber(category.postCount)} posts
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Category Banner */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: category.imageUrl }} style={styles.bannerImage} />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>{category.name}</Text>
          <Text style={styles.bannerDescription}>{category.description}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Posts */}
        <View style={styles.postsContainer}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="images-outline" size={64} color={colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No posts in this category yet
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                Be the first to share something amazing in {category.name}!
              </Text>
              <TouchableOpacity 
                style={[styles.createButton, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('Create' as never)}
              >
                <Ionicons name="add" size={20} color="#ffffff" />
                <Text style={styles.createButtonText}>Create Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* End of feed indicator */}
        {filteredPosts.length > 0 && (
          <View style={styles.endIndicator}>
            <Text style={[styles.endText, { color: colors.textSecondary }]}>
              You've reached the end of {category.name}
            </Text>
          </View>
        )}
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
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  bannerContainer: {
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerDescription: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  postsContainer: {
    paddingTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    gap: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  endIndicator: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  endText: {
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 