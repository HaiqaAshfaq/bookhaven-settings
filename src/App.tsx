import { useState } from "react";
import {
  BookOpen,
  Sun,
  Moon,
  Coffee,
  CloudMoon,
  AlignLeft,
  AlignJustify,
  Wifi,
  Bell,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";
 
const THEMES = [
  { id: "light", label: "Light", icon: Sun, bg: "#FFFFFF", ink: "#2A2521" },
  { id: "sepia", label: "Sepia", icon: Coffee, bg: "#F1E4C9", ink: "#4A3A22" },
  { id: "dark", label: "Dark", icon: Moon, bg: "#242220", ink: "#E7E2D8" },
  { id: "night", label: "Night", icon: CloudMoon, bg: "#0B0D12", ink: "#8FA6C7" },
];
 
const FONTS = [
  { id: "serif", label: "Serif", stack: "'Iowan Old Style', 'Palatino Linotype', Georgia, serif" },
  { id: "sans", label: "Sans", stack: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" },
  { id: "mono", label: "Mono", stack: "'IBM Plex Mono', 'Courier New', monospace" },
];
 
const INK = "#2A2521";
const INK_SOFT = "#6B6259";
const PAPER = "#F5F2EC";
const CARD = "#FBF9F4";
const BORDER = "#E4DFD3";
const ACCENT = "#2F5D50";
const ACCENT_SOFT = "#E4ECE9";
const GOLD = "#B8935A";
 
function Toggle({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 26,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        padding: 3,
        background: checked ? ACCENT : "#D8D2C4",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#FFFFFF",
          transform: checked ? "translateX(18px)" : "translateX(0)",
          transition: "transform 0.2s ease",
          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  );
}
 
function Row({ title, subtitle, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "14px 0",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 15, color: INK, fontWeight: 500 }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: 13, color: INK_SOFT, marginTop: 2, lineHeight: 1.4 }}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}
 
function Section({ eyebrow, title, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: GOLD,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "'Iowan Old Style', Georgia, serif",
            fontSize: 20,
            fontWeight: 600,
            color: INK,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          background: CARD,
          border: `1px solid ${BORDER}`,
          borderRadius: 14,
          padding: "4px 18px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
 
export default function ReadingSettings() {
  const [themeId, setThemeId] = useState("sepia");
  const [fontId, setFontId] = useState("serif");
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [justify, setJustify] = useState(true);
 
  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [releaseAlerts, setReleaseAlerts] = useState(false);
 
  const theme = THEMES.find((t) => t.id === themeId);
  const font = FONTS.find((f) => f.id === fontId);
 
  const sample =
    "The lighthouse keeper had long since stopped counting the storms. Each one arrived the same way — a low hush over the water, gulls scattering inland, and then the sky closing like a fist. She lit the lamp anyway, every evening, whether the fishermen were out or not.";
 
  return (
    <div
      style={{
        background: PAPER,
        minHeight: "100%",
        padding: "28px 22px 48px",
        fontFamily: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <BookOpen size={22} color={ACCENT} strokeWidth={1.75} />
          <h1
            style={{
              fontFamily: "'Iowan Old Style', Georgia, serif",
              fontSize: 26,
              fontWeight: 600,
              color: INK,
              margin: 0,
            }}
          >
            Settings
          </h1>
        </div>
 
        {/* Live preview — the signature element */}
        <div
          style={{
            background: theme.bg,
            border: `1px solid ${BORDER}`,
            borderRadius: 16,
            padding: "26px 28px",
            marginBottom: 30,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            transition: "background 0.25s ease",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: themeId === "light" || themeId === "sepia" ? INK_SOFT : "#9C9689",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Preview
          </div>
          <p
            style={{
              fontFamily: font.stack,
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              color: theme.ink,
              textAlign: justify ? "justify" : "left",
              margin: 0,
            }}
          >
            {sample}
          </p>
        </div>
 
        <Section eyebrow="Reading" title="Appearance">
          <Row title="Theme">
            <div style={{ display: "flex", gap: 6 }}>
              {THEMES.map((t) => {
                const Icon = t.icon;
                const active = t.id === themeId;
                return (
                  <button
                    key={t.id}
                    aria-label={t.label}
                    onClick={() => setThemeId(t.id)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      border: active ? `1.5px solid ${ACCENT}` : `1px solid ${BORDER}`,
                      background: active ? ACCENT_SOFT : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={16} color={active ? ACCENT : INK_SOFT} strokeWidth={1.75} />
                  </button>
                );
              })}
            </div>
          </Row>
 
          <Row title="Font">
            <div style={{ display: "flex", gap: 6 }}>
              {FONTS.map((f) => {
                const active = f.id === fontId;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFontId(f.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontSize: 13,
                      border: active ? `1.5px solid ${ACCENT}` : `1px solid ${BORDER}`,
                      background: active ? ACCENT_SOFT : "transparent",
                      color: active ? ACCENT : INK_SOFT,
                      cursor: "pointer",
                      fontFamily: f.stack,
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Row>
 
          <Row title="Text size" subtitle={`${fontSize}px`}>
            <input
              type="range"
              min="14"
              max="26"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: 140, accentColor: ACCENT }}
            />
          </Row>
 
          <Row title="Line spacing" subtitle={lineHeight.toFixed(1)}>
            <input
              type="range"
              min="1.2"
              max="2.2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              style={{ width: 140, accentColor: ACCENT }}
            />
          </Row>
 
          <Row title="Text alignment">
            <div style={{ display: "flex", gap: 6 }}>
              <button
                aria-label="Left aligned"
                onClick={() => setJustify(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: !justify ? `1.5px solid ${ACCENT}` : `1px solid ${BORDER}`,
                  background: !justify ? ACCENT_SOFT : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <AlignLeft size={16} color={!justify ? ACCENT : INK_SOFT} strokeWidth={1.75} />
              </button>
              <button
                aria-label="Justified"
                onClick={() => setJustify(true)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: justify ? `1.5px solid ${ACCENT}` : `1px solid ${BORDER}`,
                  background: justify ? ACCENT_SOFT : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <AlignJustify size={16} color={justify ? ACCENT : INK_SOFT} strokeWidth={1.75} />
              </button>
            </div>
          </Row>
        </Section>
 
        <Section eyebrow="Library" title="Sync and downloads">
          <Row title="Auto-sync library" subtitle="Keep progress and bookmarks up to date across devices">
            <Toggle checked={autoSync} onChange={setAutoSync} label="Auto-sync library" />
          </Row>
          <Row title="Download over wifi only" subtitle="Avoid using cellular data for book downloads">
            <Toggle checked={wifiOnly} onChange={setWifiOnly} label="Download over wifi only" />
          </Row>
          <Row title="Storage used" subtitle="1.2 GB of books downloaded">
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: INK_SOFT, fontSize: 13 }}>
              <Wifi size={14} strokeWidth={1.75} />
            </div>
          </Row>
        </Section>
 
        <Section eyebrow="Alerts" title="Notifications">
          <Row title="Daily reading reminder" subtitle="A nudge at 8:00 PM if you haven't opened a book">
            <Toggle checked={reminders} onChange={setReminders} label="Daily reading reminder" />
          </Row>
          <Row title="New release alerts" subtitle="Notify me when an author I follow publishes">
            <Toggle checked={releaseAlerts} onChange={setReleaseAlerts} label="New release alerts" />
          </Row>
        </Section>
 
        <Section eyebrow="Account" title="Account and data">
          <Row title="Signed in as" subtitle="reader@example.com">
            <ChevronRight size={16} color={INK_SOFT} />
          </Row>
          <Row title="Clear cache" subtitle="Frees up space without removing your books">
            <button
              onClick={() => {}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 8,
                border: `1px solid ${BORDER}`,
                background: "transparent",
                color: INK_SOFT,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <Trash2 size={14} strokeWidth={1.75} />
              Clear
            </button>
          </Row>
          <Row title="Sign out">
            <button
              onClick={() => {}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 8,
                border: "1px solid #E2C9C4",
                background: "transparent",
                color: "#9C4A3E",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <LogOut size={14} strokeWidth={1.75} />
              Sign out
            </button>
          </Row>
        </Section>
 
        <div style={{ textAlign: "center", fontSize: 12, color: INK_SOFT, marginTop: 8 }}>
          <Bell size={12} style={{ verticalAlign: "-1px", marginRight: 4 }} strokeWidth={1.75} />
          Reminders respect your device's Do Not Disturb schedule.
        </div>
      </div>
    </div>
  );
}