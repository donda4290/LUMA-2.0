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
          <Text style={[styles.postText, { color: colors.text }]}>
            {post.content.text}
          </Text>
        );
      case 'quote':
        return (
          <View style={[styles.quoteContainer, { borderLeftColor: colors.primary }]}>
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
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
              @{post.author.username}
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {post.timestamp}
          </Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Post Actions */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? '#ef4444' : colors.textSecondary}
            />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {formatNumber(likesCount)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color={colors.textSecondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {formatNumber(post.stats.comments)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color={colors.textSecondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {formatNumber(post.stats.shares)}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={bookmarked ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorText: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    marginRight: 8,
  },
  moreButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postImage: {
    width: width - 64,
    height: (width - 64) * 0.75,
    borderRadius: 12,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
  quoteContainer: {
    borderLeftWidth: 4,
    paddingLeft: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: 8,
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
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
}); 