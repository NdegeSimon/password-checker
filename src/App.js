import { useState } from 'react';
import './App.css'; // Make sure to create this CSS file for styling

function PasswordInput({ onPasswordChange }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    onPasswordChange(newPassword);
  };

  return (
    <div className="signup-form">
      <h1 className="form-title">Sign Up</h1>
      
      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
          />
          <button 
            type="button" 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
    </div>
  );
}

const PasswordRequirements = {
  rules: {
    minLength: 8,
    requireNumber: true,
    requireSpecialChar: true,
    requireUppercase: true,
    blacklist: ['password', '123456', 'admin']
  },
  validate(password) {
    const errors = [];
    
    if (password.length < this.rules.minLength) {
      errors.push(`Minimum ${this.rules.minLength} characters`);
    }
    
    if (this.rules.requireNumber && !/\d/.test(password)) {
      errors.push('At least one number required');
    }
    
    if (this.rules.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('At least one uppercase letter required');
    }
    
    if (this.rules.requireSpecialChar && !/[!@#$%^&*]/.test(password)) {
      errors.push('At least one special character required');
    }
    
    if (this.rules.blacklist.includes(password.toLowerCase())) {
      errors.push('Password is too common');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  getRequirementsText() {
    return [
      `• Minimum ${this.rules.minLength} characters`,
      this.rules.requireNumber ? '• At least one number' : null,
      this.rules.requireUppercase ? '• At least one uppercase letter' : null,
      this.rules.requireSpecialChar ? '• At least one special character (!@#$%^&*)' : null,
      '• Not a common password'
    ].filter(Boolean).join('\n');
  }
};

function PasswordStrengthMeter({ password }) {
  const calculateStrength = (pwd) => {
    let score = 0;
    
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    
    return Math.min(score, 5);
  };
  
  const strength = calculateStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  
  return (
    <div className="strength-container">
      <div className="strength-meter">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={`strength-bar ${i <= strength ? 'active' : ''}`}
            style={{ backgroundColor: i <= strength ? 
              ['#ff4d4d', '#ff814d', '#ffb74d', '#66bb6a', '#2e7d32'][i-1] : '#ddd' }}
          />
        ))}
      </div>
      <p className="strength-label">Strength: {strengthLabels[strength - 1] || 'None'}</p>
    </div>
  );
}

function App() {
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState({ isValid: false, errors: [] });

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    setValidation(PasswordRequirements.validate(newPassword));
  };

  return (
    <div className="app-container">
      <h1>Password Demo</h1>
      <div className="form-container">
        <PasswordInput onPasswordChange={handlePasswordChange} />
        
        <div className="password-feedback">
          <PasswordStrengthMeter password={password} />
          
          <div className="requirements">
            <h4>Password Requirements:</h4>
            <pre>{PasswordRequirements.getRequirementsText()}</pre>
          </div>
          
          {!validation.isValid && password.length > 0 && (
            <div className="error-messages">
              <h4>Issues to fix:</h4>
              <ul>
                {validation.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;