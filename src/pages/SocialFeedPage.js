import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNetworking } from '../contexts/NetworkingContext';

const SocialFeedPage = () => {
  const { user } = useAuth();
  const { addPoints } = useNetworking();
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const fileInputRef = useRef(null);

  // Mock social feed data
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Yagnik Patel',
        avatar: 'YP',
        field: 'Computer Science'
      },
      content: 'Just finished the AI Workshop! Amazing session on neural networks. The hands-on coding examples really helped understand the concepts better. 🤖 #AIWorkshop #MachineLearning',
      timestamp: new Date(Date.now() - 300000),
      likes: 12,
      comments: 3,
      shares: 2,
      type: 'text',
      event: 'AI Development Workshop',
      tags: ['AI', 'Workshop', 'Learning'],
      liked: false,
      image: null
    },
    {
      id: 2,
      author: {
        name: 'Darpan Agrawal',
        avatar: 'DA',
        field: 'Data Science'
      },
      content: 'Great networking at today\'s industry mixer! Connected with professionals from Google and Microsoft. Already got 3 LinkedIn connections! 🚀',
      timestamp: new Date(Date.now() - 600000),
      likes: 8,
      comments: 5,
      shares: 1,
      type: 'text',
      event: 'Industry Networking Mixer',
      tags: ['Networking', 'Career', 'Industry'],
      liked: true,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500'
    },
    {
      id: 3,
      author: {
        name: 'Mansi Sharma',
        avatar: 'MS',
        field: 'UI/UX Design'
      },
      content: 'Check out my latest project showcase! Built a responsive web app for event management. Would love to get feedback from the community! 💻✨',
      timestamp: new Date(Date.now() - 900000),
      likes: 15,
      comments: 7,
      shares: 4,
      type: 'project',
      event: null,
      tags: ['WebDev', 'Project', 'Showcase'],
      liked: false,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500'
    },
    {
      id: 4,
      author: {
        name: 'Campus Connect',
        avatar: 'CC',
        field: 'Official'
      },
      content: '🎉 Congratulations to all participants of the 48-Hour Innovation Challenge! Amazing projects and great teamwork. Winners will be announced tomorrow!',
      timestamp: new Date(Date.now() - 1200000),
      likes: 25,
      comments: 12,
      shares: 8,
      type: 'announcement',
      event: '48-Hour Innovation Challenge',
      tags: ['Hackathon', 'Innovation', 'Competition'],
      liked: true,
      image: null
    },
    {
      id: 5,
      author: {
        name: 'Ayush Singh',
        avatar: 'AS',
        field: 'Cybersecurity'
      },
      content: 'Looking for team members for the upcoming cybersecurity competition! Need 2 more people with experience in penetration testing. DM me if interested! 🔐',
      timestamp: new Date(Date.now() - 1800000),
      likes: 6,
      comments: 8,
      shares: 3,
      type: 'collaboration',
      event: null,
      tags: ['Cybersecurity', 'TeamUp', 'Competition'],
      liked: false,
      image: null
    }
  ]);

  const [polls] = useState([
    {
      id: 1,
      question: 'Which technology should we focus on in the next workshop?',
      options: [
        { text: 'React Native', votes: 15 },
        { text: 'Flutter', votes: 12 },
        { text: 'Vue.js', votes: 8 },
        { text: 'Angular', votes: 5 }
      ],
      totalVotes: 40,
      userVoted: false,
      author: 'Tech Club',
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: {
        name: user?.name || 'You',
        avatar: user?.avatar || 'U',
        field: user?.field || 'Student'
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      type: 'text',
      event: null,
      tags: [],
      liked: false,
      image: selectedImage
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    setSelectedImage(null);
    addPoints(15, 'creating a post');
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        return {
          ...post,
          liked: newLiked,
          likes: newLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));

    addPoints(2, 'liking a post');
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'project': return 'work';
      case 'announcement': return 'campaign';
      case 'collaboration': return 'group_add';
      default: return 'chat_bubble';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'project': return 'text-blue-500';
      case 'announcement': return 'text-green-500';
      case 'collaboration': return 'text-purple-500';
      default: return 'text-custom-text-secondary';
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'events') return post.event;
    if (activeTab === 'projects') return post.type === 'project';
    if (activeTab === 'announcements') return post.type === 'announcement';
    return true;
  });

  const PostCard = ({ post }) => (
    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-6 hover:shadow-lg transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold">
          {post.author.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-custom-text">{post.author.name}</h3>
            <span className="text-custom-text-secondary text-sm">•</span>
            <span className="text-custom-text-secondary text-sm">{post.author.field}</span>
            <span className={`material-icons text-sm ${getPostTypeColor(post.type)}`}>
              {getPostTypeIcon(post.type)}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-custom-text-secondary text-sm">{formatTimeAgo(post.timestamp)}</span>
            {post.event && (
              <>
                <span className="text-custom-text-secondary text-sm">•</span>
                <span className="text-custom-teal text-sm">{post.event}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-custom-text whitespace-pre-wrap">{post.content}</p>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-custom-teal text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Image */}
        {post.image && (
          <div className="mt-4">
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-custom-border">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleLike(post.id)}
            className={`flex items-center space-x-2 transition-colors ${
              post.liked ? 'text-red-500' : 'text-custom-text-secondary hover:text-red-500'
            }`}
          >
            <span className="material-icons text-sm">
              {post.liked ? 'favorite' : 'favorite_border'}
            </span>
            <span className="text-sm">{post.likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-custom-text-secondary hover:text-custom-text transition-colors">
            <span className="material-icons text-sm">chat_bubble_outline</span>
            <span className="text-sm">{post.comments}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-custom-text-secondary hover:text-custom-text transition-colors">
            <span className="material-icons text-sm">share</span>
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
        
        <button className="text-custom-text-secondary hover:text-custom-text">
          <span className="material-icons text-sm">bookmark_border</span>
        </button>
      </div>
    </div>
  );

  const PollCard = ({ poll }) => (
    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <span className="material-icons text-custom-teal">poll</span>
        <h3 className="font-semibold text-custom-text">Poll by {poll.author}</h3>
        <span className="text-custom-text-secondary text-sm">•</span>
        <span className="text-custom-text-secondary text-sm">{formatTimeAgo(poll.timestamp)}</span>
      </div>
      
      <h4 className="text-lg font-medium text-custom-text mb-4">{poll.question}</h4>
      
      <div className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = (option.votes / poll.totalVotes) * 100;
          return (
            <div key={index} className="relative">
              <button className="w-full text-left p-3 bg-custom-bg rounded-lg hover:bg-custom-bg-2 transition duration-300 border border-custom-border">
                <div className="flex items-center justify-between">
                  <span className="text-custom-text">{option.text}</span>
                  <span className="text-custom-text-secondary text-sm">{option.votes} votes</span>
                </div>
                <div className="mt-2 bg-custom-border rounded-full h-2">
                  <div
                    className="bg-custom-teal h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      
      <p className="text-custom-text-secondary text-sm mt-4">
        {poll.totalVotes} total votes
      </p>
    </div>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Create Post */}
            <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold">
                  {user?.avatar || 'U'}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts, projects, or ask for collaboration..."
                    className="w-full p-3 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal resize-none"
                    rows="3"
                  />
                  
                  {selectedImage && (
                    <div className="mt-3 relative">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-h-48 rounded-lg"
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 text-custom-text-secondary hover:text-custom-text transition-colors"
                      >
                        <span className="material-icons text-sm">image</span>
                        <span className="text-sm">Photo</span>
                      </button>
                      <button className="flex items-center space-x-2 text-custom-text-secondary hover:text-custom-text transition-colors">
                        <span className="material-icons text-sm">poll</span>
                        <span className="text-sm">Poll</span>
                      </button>
                      <button className="flex items-center space-x-2 text-custom-text-secondary hover:text-custom-text transition-colors">
                        <span className="material-icons text-sm">event</span>
                        <span className="text-sm">Event</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-custom-teal text-black px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-custom-bg-2 p-1 rounded-lg border border-custom-border">
                {[
                  { id: 'all', label: 'All Posts', icon: 'dynamic_feed' },
                  { id: 'events', label: 'Events', icon: 'event' },
                  { id: 'projects', label: 'Projects', icon: 'work' },
                  { id: 'announcements', label: 'Announcements', icon: 'campaign' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-custom-teal text-black'
                        : 'text-custom-text-secondary hover:text-custom-text'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="material-icons text-sm">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {/* Polls */}
              {activeTab === 'all' && polls.map(poll => (
                <PollCard key={poll.id} poll={poll} />
              ))}
              
              {/* Posts */}
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
              <h3 className="text-lg font-semibold text-custom-text mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {[
                  { tag: 'AIWorkshop', posts: 15 },
                  { tag: 'CareerFair2025', posts: 12 },
                  { tag: 'InnovationChallenge', posts: 8 },
                  { tag: 'WebDev', posts: 6 },
                  { tag: 'Networking', posts: 5 }
                ].map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-custom-teal cursor-pointer hover:underline">
                      #{trend.tag}
                    </span>
                    <span className="text-custom-text-secondary text-sm">
                      {trend.posts} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
              <h3 className="text-lg font-semibold text-custom-text mb-4">Active Users</h3>
              <div className="space-y-3">
                {[
                  { name: 'Mahek Sachdev', avatar: 'MS', status: 'online' },
                  { name: 'Darsh Ayde', avatar: 'DA', status: 'online' },
                  { name: 'Meet Shah', avatar: 'MS', status: 'away' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-custom-blue to-custom-teal flex items-center justify-center text-white font-bold text-sm">
                        {user.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-custom-bg-2 ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <span className="text-custom-text text-sm">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border">
              <h3 className="text-lg font-semibold text-custom-text mb-4">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-custom-text-secondary">Posts Created</span>
                  <span className="font-semibold text-custom-text">
                    {posts.filter(p => p.author.name === user?.name).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-custom-text-secondary">Likes Given</span>
                  <span className="font-semibold text-custom-text">
                    {posts.filter(p => p.liked).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-custom-text-secondary">Points Earned</span>
                  <span className="font-semibold text-custom-teal">{user?.points || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocialFeedPage;
