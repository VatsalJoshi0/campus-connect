import React from 'react';
import OptimizedImage from './OptimizedImage';

const ProfileHeader = ({
  user,
  isEditing,
  onEditClick,
  onSave,
  onCancel,
  onImageChange,
  stats = { connections: 0, points: 0, completion: 0 }
}) => {
  const fileInputRef = React.useRef(null);

  return (
    <div className="bg-custom-bg-2 rounded-lg border border-custom-border p-8 transition-shadow hover:shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Profile Image Section */}
        <div className="relative group">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {user?.profileImage ? (
              <OptimizedImage
                src={user.profileImage}
                alt={`${user.name}'s profile photo`}
                width={128}
                height={128}
                className="rounded-full object-cover w-full h-full ring-4 ring-custom-teal ring-offset-4 ring-offset-custom-bg-2"
                loading="eager"
                priority={true}
              />
            ) : (
              <div 
                className="w-full h-full rounded-full bg-gradient-to-br from-custom-teal to-custom-blue flex items-center justify-center text-3xl font-bold ring-4 ring-custom-teal ring-offset-4 ring-offset-custom-bg-2"
                style={{ color: '#000000' }}
                role="img"
                aria-label={`${user?.name}'s profile avatar with initials ${user?.initials}`}
              >
                {user?.initials}
              </div>
            )}

            {isEditing && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onImageChange}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile photo"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  aria-label="Change profile photo"
                >
                  <span className="material-icons">photo_camera</span>
                </button>
              </>
            )}
          </div>

          {!isEditing && user?.isOnline && (
            <span 
              className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full"
              aria-label="Online"
            ></span>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                defaultValue={user?.name}
                className="text-3xl font-bold bg-transparent border-b-2 border-custom-border focus:border-custom-teal outline-none text-custom-text w-full"
                placeholder="Your name"
                aria-label="Name"
              />
              <textarea
                defaultValue={user?.bio}
                rows="3"
                className="w-full p-3 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
                placeholder="Tell us about yourself..."
                aria-label="Bio"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-custom-text mb-2">{user?.name}</h1>
              <p className="text-custom-text-secondary mb-2">{user?.field} • {user?.year}</p>
              <p className="text-custom-text">{user?.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center space-x-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-custom-teal">{stats.connections}</div>
              <div className="text-sm text-custom-text-secondary">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-custom-teal">{stats.points}</div>
              <div className="text-sm text-custom-text-secondary">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-custom-teal">{stats.completion}%</div>
              <div className="text-sm text-custom-text-secondary">Complete</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                className="bg-custom-teal text-black px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button
                onClick={onCancel}
                className="bg-custom-bg border border-custom-border text-custom-text px-6 py-2 rounded-lg hover:bg-custom-bg-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-teal focus:ring-offset-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={onEditClick}
              className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 flex items-center space-x-2"
            >
              <span className="material-icons text-sm">edit</span>
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;