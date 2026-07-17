import { useId, useState, type FormEvent, type ReactNode } from "react";
import "./App.css";
import {
  type ReaderSettingsFormData,
  type FormErrors,
  validateForm,
  hasErrors,
} from "./validation";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Romance",
  "Fantasy",
  "Science Fiction",
  "Biography",
  "Self-Help",
  "Poetry",
  "Other",
] as const;

const INITIAL_FORM: ReaderSettingsFormData = {
  fullName: "",
  email: "",
  favoriteGenre: "",
  readingGoal: "",
  darkMode: false,
  emailNotifications: true,
};

/* ---------------------------- Icon components --------------------------- */

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d="M4 4.5C4 3.67 4.67 3 5.5 3H12v18H5.5A1.5 1.5 0 0 1 4 19.5v-15Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 4.5c0-.83-.67-1.5-1.5-1.5H12v18h6.5c.83 0 1.5-.67 1.5-1.5v-15Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 6.5 12 12l7.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGoal() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M6 10a6 6 0 1 1 12 0c0 3.5 1 5 1.5 5.5H4.5C5 15 6 13.5 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ------------------------------ Form field ------------------------------ */

interface FormFieldProps {
  id: string;
  label: string;
  icon: ReactNode;
  error?: string;
  children: ReactNode;
}

function FormField({ id, label, icon, error, children }: FormFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        <span className="field-icon">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ----------------------------- Toggle switch ----------------------------- */

interface ToggleSwitchProps {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSwitch({ id, label, description, icon, checked, onChange }: ToggleSwitchProps) {
  return (
    <div className="toggle-row">
      <div className="toggle-text">
        <span className="toggle-label">
          <span className="field-icon">{icon}</span>
          {label}
        </span>
        <span className="toggle-description">{description}</span>
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`switch ${checked ? "switch-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-thumb" />
      </button>
    </div>
  );
}

/* --------------------------------- App ----------------------------------- */

function App() {
  const [form, setForm] = useState<ReaderSettingsFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [savedMessage, setSavedMessage] = useState<string>("");

  const nameId = useId();
  const emailId = useId();
  const genreId = useId();
  const goalId = useId();

  function updateField<K extends keyof ReaderSettingsFormData>(
    key: K,
    value: ReaderSettingsFormData[K]
  ) {
    const nextForm = { ...form, [key]: value };
    setForm(nextForm);
    setSavedMessage("");

    // Re-validate live only for fields already touched, so errors clear as the user fixes them.
    if (touched[key]) {
      setErrors(validateForm(nextForm));
    }
  }

  function handleBlur(key: keyof ReaderSettingsFormData) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validateForm(form));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      favoriteGenre: true,
      readingGoal: true,
    });

    if (!hasErrors(validationErrors)) {
      setSavedMessage("Your reader settings have been saved successfully.");
      // Integration point: send `form` to an API / persistence layer here.
    } else {
      setSavedMessage("");
    }
  }

  return (
    <div className={`app-shell ${form.darkMode ? "theme-dark" : ""}`}>
      <main className="settings-page">
        <div className="settings-card">
          <header className="settings-header">
            <div className="brand">
              <IconBook />
              <span>Book Haven</span>
            </div>
            <h1>Reader Settings</h1>
            <p className="settings-subtitle">
              Personalize your reading experience, your way.
            </p>
          </header>

          <form className="settings-form" onSubmit={handleSubmit} noValidate>
            <FormField id={nameId} label="Full Name" icon={<IconUser />} error={errors.fullName}>
              <input
                id={nameId}
                type="text"
                className="text-input"
                placeholder="e.g. Amelia Hart"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? `${nameId}-error` : undefined}
                autoComplete="name"
              />
            </FormField>

            <FormField id={emailId} label="Email Address" icon={<IconMail />} error={errors.email}>
              <input
                id={emailId}
                type="email"
                className="text-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${emailId}-error` : undefined}
                autoComplete="email"
              />
            </FormField>

            <FormField id={genreId} label="Favorite Genre" icon={<IconSparkle />}>
              <select
                id={genreId}
                className="select-input"
                value={form.favoriteGenre}
                onChange={(e) => updateField("favoriteGenre", e.target.value)}
                onBlur={() => handleBlur("favoriteGenre")}
              >
                <option value="" disabled>
                  Select your favorite genre
                </option>
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id={goalId}
              label="Reading Goal (books / year)"
              icon={<IconGoal />}
              error={errors.readingGoal}
            >
              <input
                id={goalId}
                type="number"
                inputMode="numeric"
                className="text-input"
                placeholder="e.g. 24"
                min={1}
                max={500}
                value={form.readingGoal}
                onChange={(e) => updateField("readingGoal", e.target.value)}
                onBlur={() => handleBlur("readingGoal")}
                aria-invalid={Boolean(errors.readingGoal)}
                aria-describedby={errors.readingGoal ? `${goalId}-error` : undefined}
              />
            </FormField>

            <div className="toggle-section">
              <ToggleSwitch
                id="darkModeToggle"
                label="Dark Mode"
                description="Switch to a softer, low-light reading theme."
                icon={<IconMoon />}
                checked={form.darkMode}
                onChange={(checked) => updateField("darkMode", checked)}
              />
              <ToggleSwitch
                id="emailNotificationsToggle"
                label="Email Notifications"
                description="Get updates on new releases and reading milestones."
                icon={<IconBell />}
                checked={form.emailNotifications}
                onChange={(checked) => updateField("emailNotifications", checked)}
              />
            </div>

            <button type="submit" className="save-button">
              Save Settings
            </button>

            <div className="save-status" role="status" aria-live="polite">
              {savedMessage && <span className="save-success">✓ {savedMessage}</span>}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;