import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  postImage?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612ab27?w=150&h=150&fit=crop&crop=face',
      username: 'sarah_designer'
    },
    content: 'liked your post',
    timestamp: '2m ago',
    postImage: 'https://images.unsplash.com/photo-1511818966892-d612672e2540?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Marcus Webb',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      username: 'arch_minimalist'
    },
    content: 'commented: "Amazing design! The use of natural light is perfect."',
    timestamp: '15m ago',
    postImage: 'https://images.unsplash.com/photo-1520637736862-4d197d17c72a?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612ab27?w=150&h=150&fit=crop&crop=face',
      username: 'steel_glass_poet'
    },
    content: 'started following you',
    timestamp: '1h ago'
  },
  {
    id: '4',
    type: 'mention',
    user: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      username: 'urban_geometry'
    },
    content: 'mentioned you in a post',
    timestamp: '2h ago',
    postImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    type: 'like',
    user: {
      name: 'Zaha Hadid Architects',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      username: 'studio_zaha'
    },
    content: 'liked your post',
    timestamp: '3h ago',
    postImage: 'https://images.unsplash.com/photo-1511818966892-d612672e2540?w=100&h=100&fit=crop'
  }
];

export default function ActivityScreen() {
  const { colors } = useTheme();

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'like':
        return { name: 'heart', color: '#ef4444' };
      case 'comment':
        return { name: 'chatbubble', color: colors.primary };
      case 'follow':
        return { name: 'person-add', color: colors.success };
      case 'mention':
        return { name: 'at', color: colors.warning };
      default:
        return { name: 'notifications', color: colors.textSecondary };
    }
  };

  const renderActivityItem = (activity: ActivityItem) => {
    const icon = getActivityIcon(activity.type);
    
    return (
      <TouchableOpacity
        key={activity.id}
        style={[styles.activityItem, { borderBottomColor: colors.border }]}
        activeOpacity={0.7}
      >
        <View style={styles.activityContent}>
          <Image source={{ uri: activity.user.avatar }} style={styles.userAvatar} />
          
          <View style={styles.activityInfo}>
            <Text style={[styles.activityText, { color: colors.text }]}>
              <Text style={styles.userName}>{activity.user.name}</Text> {activity.content}
            </Text>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
              {activity.timestamp}
            </Text>
          </View>
          
          <View style={styles.activityIcon}>
            <Ionicons name={icon.name as any} size={16} color={icon.color} />
          </View>
        </View>
        
        {activity.postImage && (
          <Image source={{ uri: activity.postImage }} style={styles.postThumbnail} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Activity</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Today</Text>
          {mockActivities.slice(0, 3).map(renderActivityItem)}
        </View>

        {/* Earlier Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Earlier</Text>
          {mockActivities.slice(3).map(renderActivityItem)}
        </View>

        {/* Empty state for older activities */}
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No more activities to show
          </Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  activityContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  activityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  postThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
}); 