import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Search, Plus, Filter } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const categories = [
  'Toutes les questions',
  'Santé',
  'Alimentation',
  'Bien-être',
  'Préparation',
  'Administratif',
  'Conseils'
];

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sophie M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    date: new Date('2024-03-15T20:30:00'),
    title: 'Conseils pour gérer les nausées matinales',
    content: 'Je suis dans mon premier trimestre et les nausées sont vraiment difficiles à gérer. Avez-vous des conseils qui ont fonctionné pour vous ?',
    category: 'Santé',
    likes: 12,
    comments: 5,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Marie L.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    date: new Date('2024-03-15T15:00:00'),
    title: 'Question sur les démarches CAF',
    content: 'Quand faut-il faire la déclaration de grossesse auprès de la CAF ? Quels documents sont nécessaires ?',
    category: 'Administratif',
    likes: 8,
    comments: 3,
    isLiked: false
  }
];

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [selectedCategory, setSelectedCategory] = useState('Toutes les questions');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Santé'
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: 'Vous',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
        },
        date: new Date(),
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        likes: 0,
        comments: 0,
        isLiked: false
      };

      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', category: 'Santé' });
      setShowNewPost(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (selectedCategory !== 'Toutes les questions' && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Questions & Réponses</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Échangez avec d'autres futures mamans
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                />
              </div>
            </div>
            <button
              onClick={() => setShowNewPost(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle question
            </button>
          </div>

          {showNewPost && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Poser une question
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    placeholder="Résumez votre question"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question
                  </label>
                  <textarea
                    rows={4}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    placeholder="Détaillez votre question..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAddPost}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Publier
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.date.toLocaleDateString()} à {post.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {post.content}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 ${
                        post.isLiked
                          ? 'text-pink-600 dark:text-pink-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-500 dark:text-gray-400">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Catégories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Règles de la communauté
            </h2>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>• Restez bienveillante et respectueuse</li>
              <li>• Évitez les jugements</li>
              <li>• Partagez votre expérience personnelle</li>
              <li>• Pour des conseils médicaux, consultez un professionnel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}