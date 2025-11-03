import React from 'react';

const SkillBadge = ({ skill, size = 'md', color = 'blue', onRemove, isEditing = false }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    green: 'bg-green-100 text-green-800 hover:bg-green-200',
    indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    red: 'bg-red-100 text-red-800 hover:bg-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    teal: 'bg-teal-100 text-teal-800 hover:bg-teal-200'
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-medium transition-colors
        ${sizeClasses[size]} ${colorClasses[color]}
        ${isEditing ? 'pr-1' : ''}
      `}
    >
      {skill}
      {isEditing && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(skill)}
          className="ml-1 rounded-full p-1 hover:bg-red-200 text-red-600 transition-colors"
          aria-label={`Remove ${skill}`}
        >
          <span className="material-icons" style={{ fontSize: '14px' }}>close</span>
        </button>
      )}
    </span>
  );
};

const SkillsSection = ({ 
  title, 
  skills = [], 
  availableSkills = [], 
  isEditing = false,
  onAdd,
  onRemove,
  inputPlaceholder = "Add a skill...",
  maxSkills = 10
}) => {
  const [newSkill, setNewSkill] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef(null);

  const filteredSuggestions = React.useMemo(() => {
    if (!newSkill) return [];
    return availableSkills
      .filter(skill => 
        !skills.includes(skill) && 
        skill.toLowerCase().includes(newSkill.toLowerCase())
      )
      .slice(0, 5);
  }, [availableSkills, skills, newSkill]);

  const handleAddSkill = (skill) => {
    if (skills.length >= maxSkills) {
      // Show error or notification
      return;
    }
    if (skill && !skills.includes(skill)) {
      onAdd(skill);
      setNewSkill('');
      inputRef.current?.focus();
    }
  };

  const getRandomColor = () => {
    const colors = ['blue', 'green', 'indigo', 'purple', 'red', 'yellow', 'teal'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-custom-text">{title}</h3>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillBadge
            key={skill}
            skill={skill}
            color={getRandomColor()}
            onRemove={isEditing ? onRemove : undefined}
            isEditing={isEditing}
          />
        ))}
      </div>

      {isEditing && (
        <div className="space-y-2">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={inputPlaceholder}
              className="w-full px-4 py-2 bg-custom-bg border border-custom-border rounded-lg text-custom-text focus:outline-none focus:ring-2 focus:ring-custom-teal"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(newSkill);
                }
              }}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-custom-bg-2 border border-custom-border rounded-lg shadow-lg">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="w-full px-4 py-2 text-left hover:bg-custom-bg text-custom-text text-sm transition-colors"
                    onClick={() => handleAddSkill(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {availableSkills
              .filter(skill => !skills.includes(skill))
              .slice(0, 5)
              .map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleAddSkill(skill)}
                  className="text-sm bg-custom-bg-2 text-custom-text-secondary hover:text-custom-text px-3 py-1 rounded-full border border-custom-border hover:border-custom-teal transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>

          {skills.length >= maxSkills && (
            <p className="text-sm text-red-500">
              Maximum number of skills reached ({maxSkills})
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;