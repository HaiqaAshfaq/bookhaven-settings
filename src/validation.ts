// src/validation.ts

export interface ReaderSettingsFormData {
  fullName: string;
  email: string;
  favoriteGenre: string;
  readingGoal: string; // kept as string to mirror controlled <input> value
  darkMode: boolean;
  emailNotifications: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  readingGoal?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFullName(name: string): string | undefined {
  if (!name.trim()) {
    return "Full name is required.";
  }
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Email address is required.";
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Please enter a valid email address.";
  }
  return undefined;
}

export function validateReadingGoal(goal: string): string | undefined {
  const trimmed = goal.trim();
  if (!trimmed) {
    return "Reading goal is required.";
  }
  const num = Number(trimmed);
  if (Number.isNaN(num)) {
    return "Reading goal must be a number.";
  }
  if (!Number.isInteger(num)) {
    return "Reading goal must be a whole number.";
  }
  if (num < 1 || num > 500) {
    return "Reading goal must be between 1 and 500.";
  }
  return undefined;
}

export function validateForm(data: ReaderSettingsFormData): FormErrors {
  const errors: FormErrors = {};

  const nameError = validateFullName(data.fullName);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const goalError = validateReadingGoal(data.readingGoal);
  if (goalError) errors.readingGoal = goalError;

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}