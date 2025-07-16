import { useState } from 'react';

function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  
  const calculateStrength = (pwd) => {
    let score = 0;
    
    // Length check
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(pwd)) score += 1;       // Uppercase
    if (/[0-9]/.test(pwd)) score += 1;       // Number
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // Special char
    
    return Math.min(score, 5); // Max score 5
  };
  
  const strength = calculateStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  
  return (
    <div>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      
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
      
      <p>Strength: {strengthLabels[strength - 1] || 'None'}</p>
    </div>
  );
}