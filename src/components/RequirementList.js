// passwordRequirements.js
const PasswordRequirements = {
  rules: {
    minLength: 8,
    requireNumber: true,
    requireSpecialChar: true,
    requireUppercase: true,
    blacklist: ['password', '123456', 'admin']
  },
  //this part validates the  password and checks for the requirements in the 
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




module.exports = PasswordRequirements;


export default PasswordRequirements;