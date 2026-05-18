export interface Section {
  id: string;
  type: "hero" | "projects";
  props: Record<string, any>;
}

export interface SectionsState {
  sections: Section[];
}

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link";

interface HeroButton {
  text: string;
  variant: ButtonVariant;
  visibility: boolean;
  link: string;
}

export interface HeroProps {
  title: string;

  subtitle: string;

  variant: "centered" | "leftImage" | "rightImage";

  colors: {
    title: string;
    subtitle: string;
    background: string;
  };

  buttons: {
    primary: HeroButton;
    secondary?: HeroButton;
  };
}

export interface HeroSection {
  id: string;
  type: "hero";
  props: HeroProps;
}
