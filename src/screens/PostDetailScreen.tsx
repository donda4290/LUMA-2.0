import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mockPosts } from '../data/mockData';
import { Comment } from '../types';

const { width } = Dimensions.get('window');

interface RouteParams {
  postId: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      username: 'sarah_designer',
      displayName: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612ab27?w=150&h=150&fit=crop&crop=face'
    },
    text: 'Absolutely stunning! The way the light plays with the curves is mesmerizing. This is exactly the kind of innovative design that pushes boundaries.',
    timestamp: '2h ago',
    likes: 24
  },
  {
    id: '2',
    author: {
      username: 'arch_minimalist',
      displayName: 'Marcus Webb',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    text: 'The integration of form and function here is perfect. Love how the organic shapes create such dynamic spaces.',
    timestamp: '4h ago',
    likes: 18
  },
  {
    id: '3',
    author: {
      username: 'urban_geometry',
      displayName: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    text: 'This reminds me of the Guggenheim in Bilbao. The fluid architecture really creates an immersive experience.',
    timestamp: '6h ago',
    likes: 12
  }
];

export default function PostDetailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as RouteParams;
  
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(1247);

  // Find the post from mock data
  const post = mockPosts.find(p => p.id === postId) || mockPosts[0];

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleComment = () => {
    if (comment.trim()) {
      // In a real app, this would add the comment to the backend
      setComment('');
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderComment = (comment: Comment) => (
    <View key={comment.id} style={[styles.commentItem, { borderBottomColor: colors.border }]}>
      <Image source={{ uri: comment.author.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={[styles.commentAuthor, { color: colors.text }]}>
            {comment.author.displayName}
          </Text>
          <Text style={[styles.commentTime, { color: colors.textSecondary }]}>
            {comment.timestamp}
          </Text>
        </View>
        <Text style={[styles.commentText, { color: colors.text }]}>
          {comment.text}
        </Text>
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.commentAction}>
            <Ionicons name="heart-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.commentActionText, { color: colors.textSecondary }]}>
              {comment.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentAction}>
            <Ionicons name="chatbubble-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.commentActionText, { color: colors.textSecondary }]}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Post</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Post Content */}
          <View style={[styles.postContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
                <View style={styles.authorText}>
                  <Text style={[styles.authorName, { color: colors.text }]}>
                    {post.author.displayName}
                  </Text>
                  <Text style={[styles.authorUsername, { color: colors.textSecondary }]}>
                    @{post.author.username}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={[styles.followButtonText, { color: colors.primary }]}>Follow</Text>
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <View style={styles.postContent}>
              {post.content.type === 'image' && post.content.imageUrl && (
                <Image
                  source={{ uri: post.content.imageUrl }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              )}

              {post.content.type === 'text' && post.content.text && (
                <Text style={[styles.postText, { color: colors.text }]}>
                  {post.content.text}
                </Text>
              )}

              {post.content.type === 'quote' && post.content.text && (
                <View style={[styles.quoteContainer, { borderLeftColor: colors.primary }]}>
                  <Text style={[styles.quoteText, { color: colors.text }]}>
                    "{post.content.text}"
                  </Text>
                </View>
              )}
            </View>

            {/* Post Actions */}
            <View style={[styles.postActions, { borderTopColor: colors.border }]}>
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

            {/* Post Timestamp */}
            <View style={styles.postTimestamp}>
              <Text style={[styles.timestampText, { color: colors.textSecondary }]}>
                {post.timestamp}
              </Text>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <Text style={[styles.commentsTitle, { color: colors.text }]}>
              Comments ({mockComments.length})
            </Text>
            {mockComments.map(renderComment)}
          </View>
        </ScrollView>

        {/* Comment Input */}
        <View style={[styles.commentInputContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.commentInput, { color: colors.text, backgroundColor: colors.background }]}
            placeholder="Add a comment..."
            placeholderTextColor={colors.textSecondary}
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: comment.trim() ? colors.primary : colors.border }]}
            onPress={handleComment}
            disabled={!comment.trim()}
          >
            <Ionicons name="send" size={20} color={comment.trim() ? '#ffffff' : colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    fontSize: 18,
    fontWeight: '600',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  postContainer: {
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  postHeader: {
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
  authorAvatar: {
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
  authorUsername: {
    fontSize: 14,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  postContent: {
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
  postActions: {
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
  postTimestamp: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  timestampText: {
    fontSize: 12,
  },
  commentsSection: {
    paddingHorizontal: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 