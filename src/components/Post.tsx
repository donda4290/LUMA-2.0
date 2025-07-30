import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Post as PostType } from '../types';

const { width } = Dimensions.get('window');

interface PostProps {
  post: PostType;
  onPress?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, onPress }) => {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(post.isLiked || false);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(post.stats.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderContent = () => {
    switch (post.content.type) {
      case 'image':
        return (
          <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <Image
              source={{ uri: post.content.imageUrl }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      case 'text':
        return (
          <View style={[styles.textContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.postText, { color: colors.text }]}>
              {post.content.text}
            </Text>
          </View>
        );
      case 'quote':
        return (
          <View style={[styles.quoteContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.quoteText, { color: colors.text }]}>
              "{post.content.text}"
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: post.author.avatar }}
            style={styles.avatar}
          />
          <View style={styles.authorText}>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {post.author.displayName}
            </Text>
            <Text style={[styles.username, { color: colors.textSecondary }]}>
              {post.timestamp}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Post Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <View style={[
              styles.actionBadge,
              { 
                backgroundColor: liked ? 'rgba(239, 68, 68, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                borderColor: liked ? '#ef4444' : colors.border
              }
            ]}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={18}
                color={liked ? '#ef4444' : colors.textSecondary}
              />
              <Text style={[
                styles.actionText,
                { color: liked ? '#ef4444' : colors.textSecondary }
              ]}>
                {formatNumber(likesCount)}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Ionicons name="chatbubble-outline" size={18} color={colors.textSecondary} />
              <Text style={[styles.actionText, { color: colors.textSecondary }]}>
                {formatNumber(post.stats.comments)}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionBadge, { backgroundColor: 'rgba(107, 114, 128, 0.1)', borderColor: colors.border }]}>
              <Ionicons name="share-outline" size={18} color={colors.textSecondary} />
              <Text style={[styles.actionText, { color: colors.textSecondary }]}>
                {formatNumber(post.stats.shares)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
          <View style={[
            styles.actionBadge,
            { 
              backgroundColor: bookmarked ? 'rgba(99, 102, 241, 0.1)' : 'rgba(107, 114, 128, 0.1)',
              borderColor: bookmarked ? colors.primary : colors.border
            }
          ]}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={bookmarked ? colors.primary : colors.textSecondary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  authorText: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  username: {
    fontSize: 13,
  },
  moreButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  postImage: {
    width: width - 56,
    height: (width - 56) * 0.8,
    borderRadius: 12,
  },
  textContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.1)',
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
  quoteContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    // No additional styling needed
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
}); 