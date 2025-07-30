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

const mockUser = {
  id: '1',
  username: 'evie_sharon',
  displayName: 'Evie Sharon',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612ab27?w=400&h=400&fit=crop&crop=face',
  location: 'Norway',
  stats: {
    followers: 34200,
    photos: 851,
    likes: 947,
  },
  photos: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
  ],
};

export default function ProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'photos' | 'about' | 'awards'>('photos');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const renderStatsItem = (value: number, label: string) => (
    <View style={styles.statsItem}>
      <Text style={styles.statsValue}>{formatNumber(value)}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );

  const renderTabButton = (tab: 'photos' | 'about' | 'awards', label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && { borderBottomColor: '#000000' }
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[
        styles.tabLabel,
        { color: activeTab === tab ? '#000000' : '#6b7280' }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerCenter} />
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header with Portrait */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: mockUser.avatar }} style={styles.profilePortrait} />
          
          {/* Statistics */}
          <View style={styles.statsContainer}>
            {renderStatsItem(mockUser.stats.followers, 'Followers')}
            {renderStatsItem(mockUser.stats.photos, 'Photos')}
            {renderStatsItem(mockUser.stats.likes, 'Likes')}
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.userText}>
              <Text style={styles.userName}>{mockUser.displayName}</Text>
              <Text style={styles.userLocation}>{mockUser.location}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>FOLLOW</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {renderTabButton('photos', 'Photos')}
            {renderTabButton('about', 'About')}
            {renderTabButton('awards', 'Awards')}
          </View>

          {/* Tab Content */}
          {activeTab === 'photos' && (
            <View style={styles.photosSection}>
              <Text style={styles.sectionTitle}>Photos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
                {mockUser.photos.map((photo, index) => (
                  <Image key={index} source={{ uri: photo }} style={styles.photoThumbnail} />
                ))}
              </ScrollView>
            </View>
          )}

          {activeTab === 'about' && (
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.aboutText}>
                Lorem ipsum dolor sit amet, consectetur ipsum of adipiscing elit. tellus vitae lacinia sollicitudin, nisl velit lobortis lectus
              </Text>
            </View>
          )}

          {activeTab === 'awards' && (
            <View style={styles.awardsSection}>
              <Text style={[styles.sectionTitle, { color: '#6b7280' }]}>Awards</Text>
              <Text style={styles.emptyText}>No awards yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  headerCenter: {
    flex: 1,
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingBottom: 20,
  },
  profilePortrait: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 0,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  contentArea: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    minHeight: 400,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userText: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: '#6b7280',
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  photosSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  photosScroll: {
    flexDirection: 'row',
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  aboutSection: {
    paddingHorizontal: 20,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6b7280',
  },
  awardsSection: {
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
  },
}); 