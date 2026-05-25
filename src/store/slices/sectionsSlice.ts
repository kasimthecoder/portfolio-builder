import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, SectionsState } from "../../types/types";
import { ProjectsSection, ProjectCard } from "@/types/projects.types";
import {
  SkillsExperienceSection,
  Skill,
  Experience,
} from "@/types/skills.types";
import {
  ContactSection,
  ContactProps,
  ContactTheme,
  SocialLink,
} from "@/types/contact.types";

const initialState: SectionsState = {
  sections: [],
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,

  reducers: {
    // ── Generic ────────────────────────────────────────────────────────────

    addSection(state, action: PayloadAction<Section>) {
      state.sections.push(action.payload);
    },

    updateSection(
      state,
      action: PayloadAction<{ id: string; props: Record<string, any> }>,
    ) {
      const section = state.sections.find((s) => s.id === action.payload.id);
      if (section) {
        section.props = { ...section.props, ...action.payload.props };
      }
    },

    deleteSection(state, action: PayloadAction<{ id: string }>) {
      state.sections = state.sections.filter((s) => s.id !== action.payload.id);
    },

    changeFullSections(state, action: PayloadAction<Section[]>) {
      state.sections = action.payload;
    },

    // ── Projects ───────────────────────────────────────────────────────────

    addProjectCard(
      state,
      action: PayloadAction<{ sectionId: string; project: ProjectCard }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        section.props.projects.push(action.payload.project);
      }
    },

    updateProjectCard(
      state,
      action: PayloadAction<{
        sectionId: string;
        projectId: string;
        updates: Partial<ProjectCard>;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        const project = section.props.projects.find(
          (p) => p.id === action.payload.projectId,
        );
        if (project) {
          Object.assign(project, action.payload.updates);
        }
      }
    },

    deleteProjectCard(
      state,
      action: PayloadAction<{ sectionId: string; projectId: string }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        section.props.projects = section.props.projects.filter(
          (p) => p.id !== action.payload.projectId,
        );
      }
    },

    reorderProjects(
      state,
      action: PayloadAction<{
        sectionId: string;
        startIndex: number;
        endIndex: number;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        const projects = section.props.projects;
        const [removed] = projects.splice(action.payload.startIndex, 1);
        projects.splice(action.payload.endIndex, 0, removed);
      }
    },

    updateAllProjects(
      state,
      action: PayloadAction<{ sectionId: string; projects: ProjectCard[] }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        section.props.projects = action.payload.projects;
      }
    },

    // ── Skills & Experience ────────────────────────────────────────────────

    addSkill(
      state,
      action: PayloadAction<{ sectionId: string; skill: Skill }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "skills" in section.props) {
        section.props.skills = [
          ...(section.props.skills ?? []),
          action.payload.skill,
        ];
      }
    },

    updateSkill(
      state,
      action: PayloadAction<{
        sectionId: string;
        skillName: string;
        skillCategory: string;
        updates: Partial<Skill>;
      }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "skills" in section.props) {
        const skill = (section.props.skills ?? []).find(
          (s) =>
            s.name === action.payload.skillName &&
            s.category === action.payload.skillCategory,
        );
        if (skill) Object.assign(skill, action.payload.updates);
      }
    },

    deleteSkill(
      state,
      action: PayloadAction<{
        sectionId: string;
        skillName: string;
        skillCategory: string;
      }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "skills" in section.props) {
        section.props.skills = (section.props.skills ?? []).filter(
          (s) =>
            !(
              s.name === action.payload.skillName &&
              s.category === action.payload.skillCategory
            ),
        );
      }
    },

    reorderSkills(
      state,
      action: PayloadAction<{
        sectionId: string;
        startIndex: number;
        endIndex: number;
      }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "skills" in section.props) {
        const skills = section.props.skills ?? [];
        const [removed] = skills.splice(action.payload.startIndex, 1);
        skills.splice(action.payload.endIndex, 0, removed);
      }
    },

    updateAllSkills(
      state,
      action: PayloadAction<{ sectionId: string; skills: Skill[] }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "skills" in section.props) {
        section.props.skills = action.payload.skills;
      }
    },

    addExperience(
      state,
      action: PayloadAction<{ sectionId: string; experience: Experience }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "experience" in section.props) {
        section.props.experience = [
          ...(section.props.experience ?? []),
          {
            ...action.payload.experience,
            id: action.payload.experience.id ?? `exp-${Date.now()}`,
          },
        ];
      }
    },

    updateExperience(
      state,
      action: PayloadAction<{
        sectionId: string;
        experienceId: string | number;
        updates: Partial<Experience>;
      }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "experience" in section.props) {
        const exp = (section.props.experience ?? []).find(
          (e) => e.id === action.payload.experienceId,
        );
        if (exp) Object.assign(exp, action.payload.updates);
      }
    },

    deleteExperience(
      state,
      action: PayloadAction<{
        sectionId: string;
        experienceId: string | number;
      }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "experience" in section.props) {
        section.props.experience = (section.props.experience ?? []).filter(
          (e) => e.id !== action.payload.experienceId,
        );
      }
    },

    reorderExperience(
      state,
      action: PayloadAction<{
        sectionId: string;
        startIndex: number;
        endIndex: number;
      }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "experience" in section.props) {
        const experience = section.props.experience ?? [];
        const [removed] = experience.splice(action.payload.startIndex, 1);
        experience.splice(action.payload.endIndex, 0, removed);
      }
    },

    updateAllExperience(
      state,
      action: PayloadAction<{ sectionId: string; experience: Experience[] }>,
    ) {
      const section = state.sections.find(
        (s) =>
          s.id === action.payload.sectionId && s.type === "skills-experience",
      ) as SkillsExperienceSection | undefined;

      if (section && "experience" in section.props) {
        section.props.experience = action.payload.experience;
      }
    },

    // ── Contact ────────────────────────────────────────────────────────────

    /** Shallow-merges top-level ContactProps keys (heading, subtitle, theme, etc.) */
    updateContactSection(
      state,
      action: PayloadAction<{ id: string; props: Partial<ContactProps> }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.id && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        section.props = { ...section.props, ...action.payload.props };
      }
    },

    /** Switch the visual theme of a contact section */
    updateContactTheme(
      state,
      action: PayloadAction<{ sectionId: string; theme: ContactTheme }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        section.props.theme = action.payload.theme;
      }
    },

    /** Merge partial updates into props.colors */
    updateContactColors(
      state,
      action: PayloadAction<{
        sectionId: string;
        updates: Partial<ContactProps["colors"]>;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        section.props.colors = {
          ...section.props.colors,
          ...action.payload.updates,
        };
      }
    },

    /** Merge partial updates into any ContactForm key */
    updateContactFormField(
      state,
      action: PayloadAction<{
        sectionId: string;
        field: keyof ContactProps["form"];
        updates: Record<string, any>;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        const target = section.props.form[action.payload.field] as Record<
          string,
          any
        >;
        Object.assign(target, action.payload.updates);
      }
    },

    addContactSocialLink(
      state,
      action: PayloadAction<{ sectionId: string; link: SocialLink }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        section.props.socialLinks.push(action.payload.link);
      }
    },

    updateContactSocialLink(
      state,
      action: PayloadAction<{
        sectionId: string;
        /** platform + href acts as a composite key */
        platform: string;
        href: string;
        updates: Partial<SocialLink>;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        const link = section.props.socialLinks.find(
          (l) =>
            l.platform === action.payload.platform &&
            l.href === action.payload.href,
        );
        if (link) Object.assign(link, action.payload.updates);
      }
    },

    deleteContactSocialLink(
      state,
      action: PayloadAction<{
        sectionId: string;
        platform: string;
        href: string;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        section.props.socialLinks = section.props.socialLinks.filter(
          (l) =>
            !(
              l.platform === action.payload.platform &&
              l.href === action.payload.href
            ),
        );
      }
    },

    reorderContactSocialLinks(
      state,
      action: PayloadAction<{
        sectionId: string;
        startIndex: number;
        endIndex: number;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        const links = section.props.socialLinks;
        const [removed] = links.splice(action.payload.startIndex, 1);
        links.splice(action.payload.endIndex, 0, removed);
      }
    },

    updateAllContactSocialLinks(
      state,
      action: PayloadAction<{ sectionId: string; links: SocialLink[] }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "contact",
      ) as ContactSection | undefined;

      if (section) {
        section.props.socialLinks = action.payload.links;
      }
    },
  },
});

export const {
  // Generic
  addSection,
  updateSection,
  deleteSection,
  changeFullSections,
  // Projects
  addProjectCard,
  updateProjectCard,
  deleteProjectCard,
  reorderProjects,
  updateAllProjects,
  // Skills
  addSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
  updateAllSkills,
  // Experience
  addExperience,
  updateExperience,
  deleteExperience,
  reorderExperience,
  updateAllExperience,
  // Contact
  updateContactSection,
  updateContactTheme,
  updateContactColors,
  updateContactFormField,
  addContactSocialLink,
  updateContactSocialLink,
  deleteContactSocialLink,
  reorderContactSocialLinks,
  updateAllContactSocialLinks,
} = sectionSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────

export const selectSectionById =
  (id: string) => (state: { sections: SectionsState }) =>
    state.sections.sections.find((s) => s.id === id);

export const selectSkillsBySectionId =
  (id: string) => (state: { sections: SectionsState }) => {
    const section = state.sections.sections.find(
      (s) => s.id === id && s.type === "skills-experience",
    ) as SkillsExperienceSection | undefined;
    return section?.props.skills ?? [];
  };

export const selectExperienceBySectionId =
  (id: string) => (state: { sections: SectionsState }) => {
    const section = state.sections.sections.find(
      (s) => s.id === id && s.type === "skills-experience",
    ) as SkillsExperienceSection | undefined;
    return section?.props.experience ?? [];
  };

export const selectContactSectionById =
  (id: string) => (state: { sections: SectionsState }) =>
    state.sections.sections.find((s) => s.id === id && s.type === "contact") as
      | ContactSection
      | undefined;

export const selectContactTheme =
  (id: string) => (state: { sections: SectionsState }) =>
    (
      state.sections.sections.find(
        (s) => s.id === id && s.type === "contact",
      ) as ContactSection | undefined
    )?.props.theme;

export const selectContactSocialLinks =
  (id: string) => (state: { sections: SectionsState }) =>
    (
      state.sections.sections.find(
        (s) => s.id === id && s.type === "contact",
      ) as ContactSection | undefined
    )?.props.socialLinks ?? [];

export const selectContactForm =
  (id: string) => (state: { sections: SectionsState }) =>
    (
      state.sections.sections.find(
        (s) => s.id === id && s.type === "contact",
      ) as ContactSection | undefined
    )?.props.form;

export default sectionSlice.reducer;
