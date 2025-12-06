// Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

// Phone number validation (Indian format)
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  // Remove spaces and dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Check for Indian phone number format
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, message: 'Please enter a valid 10-digit phone number' };
  }
  
  return { isValid: true, message: '' };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, message: 'Name can only contain letters and spaces' };
  }
  
  return { isValid: true, message: '' };
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

// Age validation
export const validateAge = (age: string): ValidationResult => {
  if (!age || age.trim() === '') {
    return { isValid: false, message: 'Age is required' };
  }
  
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum)) {
    return { isValid: false, message: 'Please enter a valid age' };
  }
  
  if (ageNum < 1 || ageNum > 120) {
    return { isValid: false, message: 'Please enter a valid age between 1 and 120' };
  }
  
  return { isValid: true, message: '' };
};

// Height validation (in cms)
export const validateHeight = (height: string): ValidationResult => {
  if (!height || height.trim() === '') {
    return { isValid: false, message: 'Height is required' };
  }
  
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) {
    return { isValid: false, message: 'Please enter a valid height' };
  }
  
  if (heightNum < 30 || heightNum > 300) {
    return { isValid: false, message: 'Please enter a valid height in centimeters' };
  }
  
  return { isValid: true, message: '' };
};

// Weight validation (in kg)
export const validateWeight = (weight: string): ValidationResult => {
  if (!weight || weight.trim() === '') {
    return { isValid: false, message: 'Weight is required' };
  }
  
  const weightNum = parseFloat(weight);
  if (isNaN(weightNum)) {
    return { isValid: false, message: 'Please enter a valid weight' };
  }
  
  if (weightNum < 1 || weightNum > 500) {
    return { isValid: false, message: 'Please enter a valid weight in kilograms' };
  }
  
  return { isValid: true, message: '' };
};

// Duration validation
export const validateDuration = (duration: string): ValidationResult => {
  if (!duration || duration.trim() === '') {
    return { isValid: false, message: 'Duration is required' };
  }
  
  const durationNum = parseInt(duration, 10);
  if (isNaN(durationNum) || durationNum < 1) {
    return { isValid: false, message: 'Please enter a valid duration' };
  }
  
  return { isValid: true, message: '' };
};

// Validate all basic info fields
export interface BasicInfoData {
  gender: string;
  age: string;
  height: string;
  weight: string;
}

export const validateBasicInfo = (data: BasicInfoData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  const genderResult = validateRequired(data.gender, 'Gender');
  if (!genderResult.isValid) errors.gender = genderResult.message;
  
  const ageResult = validateAge(data.age);
  if (!ageResult.isValid) errors.age = ageResult.message;
  
  const heightResult = validateHeight(data.height);
  if (!heightResult.isValid) errors.height = heightResult.message;
  
  const weightResult = validateWeight(data.weight);
  if (!weightResult.isValid) errors.weight = weightResult.message;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate concern form
export interface ConcernFormData {
  concern: string;
  severity: string;
  duration: string;
  durationUnit: string;
}

export const validateConcernForm = (data: ConcernFormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  const concernResult = validateRequired(data.concern, 'Concern');
  if (!concernResult.isValid) errors.concern = concernResult.message;
  
  const severityResult = validateRequired(data.severity, 'Severity');
  if (!severityResult.isValid) errors.severity = severityResult.message;
  
  const durationResult = validateDuration(data.duration);
  if (!durationResult.isValid) errors.duration = durationResult.message;
  
  const durationUnitResult = validateRequired(data.durationUnit, 'Duration unit');
  if (!durationUnitResult.isValid) errors.durationUnit = durationUnitResult.message;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
