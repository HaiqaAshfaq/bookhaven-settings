// src/validation.test.ts
import { describe, it, expect } from "vitest";
import {
  validateFullName,
  validateEmail,
  validateReadingGoal,
  validateForm,
  hasErrors,
  type ReaderSettingsFormData,
} from "./validation";

describe("validateFullName", () => {
  it("rejects empty string", () => {
    expect(validateFullName("")).toBe("Full name is required.");
  });

  it("rejects whitespace-only string", () => {
    expect(validateFullName("   ")).toBe("Full name is required.");
  });

  it("accepts a valid name", () => {
    expect(validateFullName("Amelia Hart")).toBeUndefined();
  });
});

describe("validateEmail", () => {
  it("rejects empty string", () => {
    expect(validateEmail("")).toBe("Email address is required.");
  });

  it("rejects missing @", () => {
    expect(validateEmail("amelia.example.com")).toBe(
      "Please enter a valid email address."
    );
  });

  it("rejects missing domain", () => {
    expect(validateEmail("amelia@")).toBe("Please enter a valid email address.");
  });

  it("rejects missing TLD", () => {
    expect(validateEmail("amelia@example")).toBe(
      "Please enter a valid email address."
    );
  });

  it("accepts a valid email", () => {
    expect(validateEmail("amelia@example.com")).toBeUndefined();
  });

  it("trims surrounding whitespace before validating", () => {
    expect(validateEmail("  amelia@example.com  ")).toBeUndefined();
  });
});

describe("validateReadingGoal", () => {
  it("rejects empty string", () => {
    expect(validateReadingGoal("")).toBe("Reading goal is required.");
  });

  it("rejects non-numeric input", () => {
    expect(validateReadingGoal("abc")).toBe("Reading goal must be a number.");
  });

  it("rejects decimal values", () => {
    expect(validateReadingGoal("12.5")).toBe("Reading goal must be a whole number.");
  });

  it("rejects zero", () => {
    expect(validateReadingGoal("0")).toBe("Reading goal must be between 1 and 500.");
  });

  it("rejects negative numbers", () => {
    expect(validateReadingGoal("-5")).toBe("Reading goal must be between 1 and 500.");
  });

  it("rejects values above 500", () => {
    expect(validateReadingGoal("501")).toBe("Reading goal must be between 1 and 500.");
  });

  it("accepts the lower boundary (1)", () => {
    expect(validateReadingGoal("1")).toBeUndefined();
  });

  it("accepts the upper boundary (500)", () => {
    expect(validateReadingGoal("500")).toBeUndefined();
  });

  it("accepts a normal value", () => {
    expect(validateReadingGoal("24")).toBeUndefined();
  });
});

describe("validateForm / hasErrors", () => {
  const validData: ReaderSettingsFormData = {
    fullName: "Amelia Hart",
    email: "amelia@example.com",
    favoriteGenre: "Fantasy",
    readingGoal: "24",
    darkMode: false,
    emailNotifications: true,
  };

  it("returns no errors for fully valid data", () => {
    const errors = validateForm(validData);
    expect(hasErrors(errors)).toBe(false);
  });

  it("collects multiple errors at once", () => {
    const errors = validateForm({
      ...validData,
      fullName: "",
      email: "bad-email",
      readingGoal: "1000",
    });
    expect(errors.fullName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.readingGoal).toBeDefined();
    expect(hasErrors(errors)).toBe(true);
  });
});