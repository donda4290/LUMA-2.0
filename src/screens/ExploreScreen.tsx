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
import { mockCategories } from '../data/mockData';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleCategoryPress = (categoryId: string) => {
    (navigation as any).navigate('CategoryFeed', { categoryId });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Explore</Text>
        <TouchableOpacity style={styles.searchButton}>
          <View style={[styles.searchBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <TouchableOpacity style={[styles.searchBar, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <Text style={[styles.searchPlaceholder, { color: colors.textSecondary }]}>
            Search architecture, designers, projects...
          </Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {mockCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Image
                  source={{ uri: category.imageUrl }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <View style={styles.categoryStats}>
                    <View style={[styles.statBadge, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                      <Text style={styles.statText}>{formatNumber(category.postCount)} posts</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending</Text>
          <View style={styles.trendingList}>
            {[
              { title: 'Modern Minimalist Design', subtitle: 'Trending in Architecture', rank: 1 },
              { title: 'Sustainable Building Materials', subtitle: 'Trending in Green Design', rank: 2 },
              { title: 'Urban Planning Innovations', subtitle: 'Trending in City Design', rank: 3 },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.trendingItem, { backgroundColor: 'rgba(107, 114, 128, 0.05)', borderColor: colors.border }]}>
                <View style={[styles.rankBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.rankText}>#{item.rank}</Text>
                </View>
                <View style={styles.trendingContent}>
                  <Text style={[styles.trendingTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.trendingSubtitle, { color: colors.textSecondary }]}>
                    {item.subtitle}
                  </Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: colors.primary }]}>
                  <Ionicons name="trending-up" size={16} color={colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchButton: {
    // No additional styling needed
  },
  searchBadge: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 24,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 56) / 2,
    height: 140,
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
    marginBottom: 8,
  },
  categoryStats: {
    flexDirection: 'row',
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  trendingList: {
    gap: 12,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  trendingSubtitle: {
    fontSize: 14,
  },
  trendBadge: {
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
}); 