

import  PasswordInput from "react";
module.exports = {
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
    
   
    return {
      isValid: errors.length === 0,
      errors
    };
  },
  
  getRequirementsText() {
    return [
      `• Minimum ${this.rules.minLength} characters`,
      this.rules.requireNumber ? '• At least one number' : null,
      this.rules.requireUppercase ? '• At least one uppercase letter' : null
    ].filter(Boolean).join('\n');
  }
};
export default 