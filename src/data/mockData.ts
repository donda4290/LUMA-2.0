import { Post, Category } from '../types';

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      username: "studio_zaha",
      displayName: "Zaha Hadid Architects",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    content: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1511818966892-d612672e2540?w=800&h=600&fit=crop",
      imageAlt: "Modern architectural facade with flowing curves"
    },
    stats: {
      likes: 1247,
      comments: 89,
      shares: 34
    },
    timestamp: "2h",
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "2",
    author: {
      username: "arch_minimalist",
      displayName: "Marcus Webb",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    content: {
      type: "text",
      text: "Just completed the design for our new sustainable housing project. The integration of passive solar design with modern materials creates spaces that breathe with the environment. Architecture isn't just about shelter—it's about creating harmony between human needs and natural systems. 🏗️🌱"
    },
    stats: {
      likes: 456,
      comments: 67,
      shares: 23
    },
    timestamp: "4h",
    isLiked: true,
    isBookmarked: false
  },
  {
    id: "3",
    author: {
      username: "brutalist_collective",
      displayName: "Urban Forms Studio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    content: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1520637736862-4d197d17c72a?w=800&h=600&fit=crop",
      imageAlt: "Brutalist concrete structure with geometric patterns"
    },
    stats: {
      likes: 789,
      comments: 124,
      shares: 45
    },
    timestamp: "6h",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "4",
    author: {
      username: "steel_glass_poet",
      displayName: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612ab27?w=150&h=150&fit=crop&crop=face"
    },
    content: {
      type: "quote",
      text: "Architecture is a visual art, and the buildings speak for themselves. The interplay of light, shadow, and form creates poetry in three dimensions."
    },
    stats: {
      likes: 324,
      comments: 41,
      shares: 67
    },
    timestamp: "8h",
    isLiked: true,
    isBookmarked: true
  },
  {
    id: "5",
    author: {
      username: "green_building_lab",
      displayName: "Sustainable Design Co.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    },
    content: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      imageAlt: "Green building with living walls and sustainable features"
    },
    stats: {
      likes: 892,
      comments: 156,
      shares: 78
    },
    timestamp: "12h",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "6",
    author: {
      username: "urban_geometry",
      displayName: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    content: {
      type: "text",
      text: "Walking through the financial district at dusk, observing how glass towers transform into vertical light sculptures. Each building tells a story of engineering ambition and design philosophy. The city becomes a living gallery of architectural expression."
    },
    stats: {
      likes: 567,
      comments: 83,
      shares: 29
    },
    timestamp: "1d",
    isLiked: true,
    isBookmarked: false
  }
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Modern Architecture",
    description: "Contemporary design and innovative structures",
    imageUrl: "https://images.unsplash.com/photo-1511818966892-d612672e2540?w=400&h=300&fit=crop",
    postCount: 1247
  },
  {
    id: "2",
    name: "Sustainable Design",
    description: "Green buildings and eco-friendly architecture",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    postCount: 892
  },
  {
    id: "3",
    name: "Brutalism",
    description: "Raw concrete and bold geometric forms",
    imageUrl: "https://images.unsplash.com/photo-1520637736862-4d197d17c72a?w=400&h=300&fit=crop",
    postCount: 567
  },
  {
    id: "4",
    name: "Urban Planning",
    description: "City design and urban development",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    postCount: 789
  },
  {
    id: "5",
    name: "Interior Design",
    description: "Beautiful spaces and functional layouts",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    postCount: 1234
  },
  {
    id: "6",
    name: "Landscape Architecture",
    description: "Outdoor spaces and natural integration",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    postCount: 456
  }
]; 