import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function CreateScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<'text' | 'image' | 'quote'>('text');

  const handlePost = () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content before posting.');
      return;
    }
    
    Alert.alert('Success', 'Your post has been created!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const postTypes = [
    { type: 'text' as const, icon: 'text', label: 'Text' },
    { type: 'image' as const, icon: 'image', label: 'Image' },
    { type: 'quote' as const, icon: 'chatbubble-ellipses', label: 'Quote' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.cancelButton, { color: colors.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Create Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={[styles.postButton, { color: colors.primary }]}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Post Type Selector */}
        <View style={styles.typeSelector}>
          {postTypes.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.typeButton,
                { 
                  backgroundColor: selectedType === item.type ? colors.primary : colors.card,
                  borderColor: colors.border 
                }
              ]}
              onPress={() => setSelectedType(item.type)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color={selectedType === item.type ? '#ffffff' : colors.textSecondary} 
              />
              <Text style={[
                styles.typeLabel,
                { color: selectedType === item.type ? '#ffffff' : colors.textSecondary }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              { 
                color: colors.text,
                backgroundColor: colors.card,
                borderColor: colors.border 
              }
            ]}
            placeholder="What's on your mind about architecture?"
            placeholderTextColor={colors.textSecondary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={1000}
          />
          
          {selectedType === 'quote' && (
            <View style={[styles.quotePreview, { backgroundColor: colors.card, borderColor: colors.primary }]}>
              <Text style={[styles.quoteText, { color: colors.text }]}>
                "{content || 'Your quote will appear here...'}"
              </Text>
            </View>
          )}
        </View>

        {/* Additional Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="camera" size={20} color={colors.textSecondary} />
            <Text style={[styles.optionText, { color: colors.textSecondary }]}>Add Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="location" size={20} color={colors.textSecondary} />
            <Text style={[styles.optionText, { color: colors.textSecondary }]}>Add Location</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.optionButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="pricetag" size={20} color={colors.textSecondary} />
            <Text style={[styles.optionText, { color: colors.textSecondary }]}>Add Tags</Text>
          </TouchableOpacity>
        </View>

        {/* Character Count */}
        <View style={styles.characterCount}>
          <Text style={[styles.countText, { color: colors.textSecondary }]}>
            {content.length}/1000 characters
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
  cancelButton: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  postButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    minHeight: 120,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  quotePreview: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
  },
  characterCount: {
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
  },
}); 