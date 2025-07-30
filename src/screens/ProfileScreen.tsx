import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface UserStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

const mockUser = {
  id: '1',
  username: 'architect_designer',
  displayName: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  bio: 'Passionate architect exploring the intersection of form, function, and sustainability.',
  location: 'New York, NY',
  website: 'alexjohnson.design',
  coverImage: 'https://images.unsplash.com/photo-1511818966892-d612672e2540?w=800&h=300&fit=crop',
  stats: {
    posts: 42,
    followers: 1247,
    following: 389,
    likes: 5678,
  } as UserStats,
};

const mockUserPosts = [
  'https://images.unsplash.com/photo-1511818966892-d612672e2540?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1520637736862-4d197d17c72a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
];

export default function ProfileScreen() {
  const { colors, toggleTheme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'liked'>('posts');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderStatsItem = (label: string, value: number) => (
    <View style={styles.statsItem}>
      <Text style={[styles.statsValue, { color: colors.text }]}>
        {formatNumber(value)}
      </Text>
      <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );

  const renderTabButton = (tab: 'posts' | 'saved' | 'liked', icon: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && { borderBottomColor: colors.primary }
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <View style={[
        styles.tabBadge,
        { 
          backgroundColor: activeTab === tab ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
          borderColor: activeTab === tab ? colors.primary : 'transparent'
        }
      ]}>
        <Ionicons
          name={icon as any}
          size={20}
          color={activeTab === tab ? colors.primary : colors.textSecondary}
        />
        <Text style={[
          styles.tabLabel,
          { color: activeTab === tab ? colors.primary : colors.textSecondary }
        ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
            <View style={[styles.themeBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Ionicons 
                name={isDarkMode ? 'sunny' : 'moon'} 
                size={18} 
                color={colors.textSecondary} 
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <View style={[styles.settingsBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Ionicons name="settings-outline" size={18} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: mockUser.coverImage }} style={styles.coverImage} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: mockUser.avatar }} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {mockUser.displayName}
              </Text>
              <Text style={[styles.profileUsername, { color: colors.textSecondary }]}>
                @{mockUser.username}
              </Text>
              <Text style={[styles.profileBio, { color: colors.text }]}>
                {mockUser.bio}
              </Text>
              <View style={styles.profileDetails}>
                <View style={styles.detailItem}>
                  <View style={[styles.detailBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
                    <Ionicons name="location" size={14} color={colors.textSecondary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                      {mockUser.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <View style={[styles.detailBadge, { backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: colors.primary }]}>
                    <Ionicons name="link" size={14} color={colors.primary} />
                    <Text style={[styles.detailText, { color: colors.primary }]}>
                      {mockUser.website}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={[styles.statsContainer, { backgroundColor: 'rgba(107, 114, 128, 0.05)', borderColor: colors.border }]}>
            {renderStatsItem('Posts', mockUser.stats.posts)}
            {renderStatsItem('Followers', mockUser.stats.followers)}
            {renderStatsItem('Following', mockUser.stats.following)}
            {renderStatsItem('Likes', mockUser.stats.likes)}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Text style={[styles.editButtonText, { color: colors.text }]}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="share-outline" size={18} color="#ffffff" />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
          {renderTabButton('posts', 'grid-outline', 'Posts')}
          {renderTabButton('saved', 'bookmark-outline', 'Saved')}
          {renderTabButton('liked', 'heart-outline', 'Liked')}
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {mockUserPosts.map((postImage, index) => (
            <TouchableOpacity key={index} style={styles.postItem}>
              <Image source={{ uri: postImage }} style={styles.postImage} />
              <View style={styles.postOverlay}>
                <View style={[styles.postStats, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
                  <Ionicons name="heart" size={14} color="#ffffff" />
                  <Text style={styles.postStatsText}>{(index + 1) * 23}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty state for other tabs */}
        {(activeTab === 'saved' || activeTab === 'liked') && (
          <View style={styles.emptyState}>
            <View style={[styles.emptyBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Ionicons 
                name={activeTab === 'saved' ? 'bookmark' : 'heart'} 
                size={48} 
                color={colors.textSecondary} 
              />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No {activeTab} posts yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              {activeTab === 'saved' 
                ? 'Posts you save will appear here' 
                : 'Posts you like will appear here'
              }
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    // No additional styling needed
  },
  themeBadge: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  settingsBadge: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  coverContainer: {
    height: 150,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileSection: {
    padding: 16,
    marginTop: -40,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  profileDetails: {
    gap: 8,
  },
  detailItem: {
    // No additional styling needed
  },
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  postItem: {
    width: (width - 48) / 3,
    height: (width - 48) / 3,
    marginBottom: 2,
    marginRight: 2,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  postStatsText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyBadge: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
}); 