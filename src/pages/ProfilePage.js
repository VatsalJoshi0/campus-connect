import React, { useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import UserAvatar from '../components/UserAvatar';
import ProfileHeader from '../components/ProfileHeader';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { showSuccess } = useNotification();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    enrollment: user?.enrollment || '',
    field: user?.field || 'Computer Engineering',
    year: user?.year || '2nd Year',
    institute: user?.institute || 'Drs. Kiran & Pallavi Patel Global University',
    bio: user?.bio || 'Passionate about technology and innovation. Always eager to learn and collaborate on exciting projects.',
    interests: user?.interests || [],
    skills: user?.skills || [],
    goals: user?.goals || [],
    projects: user?.projects || []
  });

  const [newItem, setNewItem] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    link: ''
  });

  const availableInterests = [
    'Web Development', 'Mobile Development', 'AI/ML', 'Data Science', 'UI/UX Design',
    'Cybersecurity', 'Cloud Computing', 'DevOps', 'Blockchain', 'IoT',
    'Game Development', 'AR/VR', 'Robotics', 'Networking', 'Database Management'
  ];

  const availableSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
    'Django', 'Flask', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'MySQL',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'Figma', 'Photoshop', 'TensorFlow'
  ];

  const availableGoals = [
    'Network with industry professionals', 'Learn new technologies', 'Find internship opportunities',
    'Start a startup', 'Contribute to open source', 'Attend tech conferences',
    'Build a portfolio', 'Get mentorship', 'Collaborate on projects', 'Improve soft skills'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field, item) => {
    if (item && !formData[field].includes(item)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], item]
      }));
    }
    setNewItem('');
  };

  const handleArrayRemove = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  const handleProjectAdd = () => {
    if (newProject.title && newProject.description) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...newProject, id: Date.now() }]
      }));
      setNewProject({ title: '', description: '', technologies: [], link: '' });
    }
  };

  const handleProjectRemove = (projectId) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const handleSave = useCallback(() => {
    updateUser(formData);
    setIsEditing(false);
    showSuccess('✅ Profile updated successfully!', {
      duration: 3000
    });
  }, [formData, updateUser, showSuccess]);

  const calculateProfileCompletion = () => {
    const fields = [
      formData.name, formData.email, formData.bio,
      formData.interests.length > 0,
      formData.skills.length > 0,
      formData.goals.length > 0,
      formData.projects.length > 0
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };

  const ArrayInput = ({ field, items, available, placeholder }) => (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {formData[field].map((item, index) => (
          <span key={index} className="bg-custom-teal text-black px-3 py-1 rounded-full text-sm flex items-center space-x-2">
            <span>{item}</span>
            {isEditing && (
              <button
                onClick={() => handleArrayRemove(field, item)}
                className="text-red-600 hover:text-red-800 ml-1"
              >
                <span className="material-icons text-sm">close</span>
              </button>
            )}
          </span>
        ))}
      </div>
      
      {isEditing && (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
              onKeyPress={(e) => e.key === 'Enter' && handleArrayAdd(field, newItem)}
            />
              <button
                onClick={() => handleArrayAdd(field, newItem)}
                className="bg-custom-bg-2 text-custom-text-secondary hover:bg-custom-bg hover:text-custom-text px-3 py-1 rounded-full text-sm border border-custom-border transition duration-300"
              >
                Add
              </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {available.filter(item => !formData[field].includes(item)).map((item) => (
              <button
                key={item}
                onClick={() => handleArrayAdd(field, item)}
                className="bg-custom-bg-2 text-custom-text-secondary hover:bg-custom-bg hover:text-custom-text px-3 py-1 rounded-full text-sm border border-custom-border transition duration-300"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <ProfileHeader
            user={{
              ...user,
              name: formData.name,
              bio: formData.bio,
              field: formData.field,
              year: formData.year,
              institute: formData.institute,
              initials: formData.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
            }}
            isEditing={isEditing}
            onEditClick={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            onImageChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result;
                updateUser({ profileImage: dataUrl });
                showSuccess('Profile photo updated', { duration: 2500 });
              };
              reader.readAsDataURL(file);
              // clear the input value so same file can be re-selected later
              e.target.value = '';
            }}
            stats={{
              connections: user?.connections || 0,
              points: user?.points || 0,
              completion: calculateProfileCompletion()
            }}
          />
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-custom-bg-2 p-1 rounded-lg border border-custom-border">
            {[
              { id: 'overview', label: 'Overview', icon: 'person' },
              { id: 'skills', label: 'Skills & Interests', icon: 'psychology' },
              { id: 'projects', label: 'Projects', icon: 'work' },
              { id: 'badges', label: 'Badges & Achievements', icon: 'military_tech' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
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

        {/* Tab Content */}
        <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-custom-text mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-custom-text-secondary text-sm font-medium mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                      />
                    ) : (
                      <p className="text-custom-text">{formData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-custom-text-secondary text-sm font-medium mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                      />
                    ) : (
                      <p className="text-custom-text">{formData.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-custom-text mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-custom-text-secondary text-sm font-medium mb-2">Field of Study</label>
                    <p className="text-custom-text">{formData.field}</p>
                  </div>
                  <div>
                    <label className="block text-custom-text-secondary text-sm font-medium mb-2">Year</label>
                    <p className="text-custom-text">{formData.year}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-custom-text mb-4">Interests</h3>
                <ArrayInput
                  field="interests"
                  available={availableInterests}
                  placeholder="Add an interest..."
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-custom-text mb-4">Technical Skills</h3>
                <ArrayInput
                  field="skills"
                  available={availableSkills}
                  placeholder="Add a skill..."
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-custom-text mb-4">Goals</h3>
                <ArrayInput
                  field="goals"
                  available={availableGoals}
                  placeholder="Add a goal..."
                />
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-custom-text">Projects</h3>
                {isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
                  >
                    <span className="material-icons text-sm">add</span>
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {/* Project List */}
              <div className="space-y-4">
                {formData.projects.map((project) => (
                  <div key={project.id} className="bg-custom-bg p-6 rounded-lg border border-custom-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-custom-text mb-2">{project.title}</h4>
                        <p className="text-custom-text-secondary mb-3">{project.description}</p>
                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-custom-teal hover:underline text-sm"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => handleProjectRemove(project.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Project Form */}
              {isEditing && (
                <div className="bg-custom-bg p-6 rounded-lg border border-custom-border">
                  <h4 className="text-lg font-semibold text-custom-text mb-4">Add New Project</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      rows="3"
                      className="w-full px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                    />
                    <input
                      type="url"
                      placeholder="Project Link (optional)"
                      value={newProject.link}
                      onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                      className="w-full px-3 py-2 bg-input border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                    />
                    <button
                      onClick={handleProjectAdd}
                      className="bg-custom-teal text-black px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-custom-text">Badges & Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user?.badges?.map((badge, index) => (
                  <div key={index} className="bg-custom-bg p-6 rounded-lg border border-custom-border text-center">
                    <span className="material-icons text-4xl text-yellow-500 mb-3 block">military_tech</span>
                    <h4 className="font-semibold text-custom-text">{badge}</h4>
                  </div>
                ))}
                
                {(!user?.badges || user.badges.length === 0) && (
                  <div className="col-span-full text-center py-12">
                    <span className="material-icons text-6xl text-custom-text-secondary mb-4 block">
                      military_tech
                    </span>
                    <h3 className="text-xl font-semibold text-custom-text mb-2">No badges yet</h3>
                    <p className="text-custom-text-secondary">
                      Start networking and participating in events to earn badges!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;