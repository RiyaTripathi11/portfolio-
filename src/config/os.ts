import type { WindowDefinition, WindowId } from "@/types/window";

export const DEFAULT_WINDOW_Z_INDEX = 100;

export const WINDOW_DEFINITIONS: Record<WindowId, WindowDefinition> = {
  about: {
    id: "about",
    title: "About Riya",
    icon: "user",
    defaultSize: {
      width: 720,
      height: 520,
    },
    minSize: {
      width: 420,
      height: 320,
    },
    resizable: true,
    draggable: true,
  },

  projects: {
    id: "projects",
    title: "Projects",
    icon: "folder",
    defaultSize: {
      width: 820,
      height: 580,
    },
    minSize: {
      width: 520,
      height: 360,
    },
    resizable: true,
    draggable: true,
  },

  skills: {
    id: "skills",
    title: "Skills",
    icon: "code",
    defaultSize: {
      width: 680,
      height: 500,
    },
    minSize: {
      width: 420,
      height: 320,
    },
    resizable: true,
    draggable: true,
  },

  experience: {
    id: "experience",
    title: "Experience",
    icon: "briefcase",
    defaultSize: {
      width: 760,
      height: 560,
    },
    minSize: {
      width: 480,
      height: 340,
    },
    resizable: true,
    draggable: true,
  },

  resume: {
    id: "resume",
    title: "Resume",
    icon: "file-text",
    defaultSize: {
      width: 820,
      height: 680,
    },
    minSize: {
      width: 520,
      height: 420,
    },
    resizable: true,
    draggable: true,
  },

  terminal: {
    id: "terminal",
    title: "Command Prompt",
    icon: "terminal",
    defaultSize: {
      width: 760,
      height: 480,
    },
    minSize: {
      width: 520,
      height: 320,
    },
    resizable: true,
    draggable: true,
  },

  contact: {
    id: "contact",
    title: "Contact Riya",
    icon: "mail",
    defaultSize: {
      width: 620,
      height: 460,
    },
    minSize: {
      width: 400,
      height: 300,
    },
    resizable: true,
    draggable: true,
  },
};
