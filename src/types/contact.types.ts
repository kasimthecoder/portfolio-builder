type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link";

// ── Social link ───────────────────────────────────────────────────────────────

export type SocialPlatform =
  | "github"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "dribbble"
  | "behance"
  | "custom";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  visible: boolean;
}

// ── Form field ────────────────────────────────────────────────────────────────

export interface ContactFormField {
  visible: boolean;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface ContactForm {
  nameField: ContactFormField;
  emailField: ContactFormField;
  subjectField: ContactFormField;
  messageField: ContactFormField;
  submitButton: {
    text: string;
    variant: ButtonVariant;
  };
  alternateButton: {
    visible: boolean;
    text: string;
    href: string;
    variant: ButtonVariant;
  };
}

// ── Colors ────────────────────────────────────────────────────────────────────

export interface ContactColors {
  heading: string;
  subtitle: string;
  badge: string;
}

// ── Theme ─────────────────────────────────────────────────────────────────────

/** Controls the overall visual feel of the contact section */
export type ContactTheme =
  /** Clean editorial layout — serif heading, thin separator rule, muted tones */
  | "editorial"
  /** Bold high-contrast block — large sans heading, solid background fill */
  | "bold"
  /** Minimal ghost — almost no chrome, maximum whitespace, fine-line accents */
  | "minimal"
  /** Warm card — soft background card wrapping the form, rounded, cozy spacing */
  | "warm";

// ── Root props ────────────────────────────────────────────────────────────────

export interface ContactProps {
  userId?: string;
  badgeText: string;
  badgeVisible: boolean;

  heading: string;
  subtitle: string;

  /** Controls the overall visual style of the section */
  theme: ContactTheme;

  /** Whether to show the animated scroll indicator at the bottom */
  showScrollIndicator: boolean;

  colors: ContactColors;
  form: ContactForm;
  socialLinks: SocialLink[];

  /** Label above the social icon row */
  socialRowLabel: string;
  socialRowVisible: boolean;
}

// ── Section wrapper ───────────────────────────────────────────────────────────

export interface ContactSection {
  id: string;
  type: "contact";
  props: ContactProps;
}
