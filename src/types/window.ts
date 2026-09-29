export type WindowId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "resume"
  | "terminal"
  | "contact";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
}

export interface WindowDefinition {
  id: WindowId;
  title: string;
  icon: string;
  defaultSize: WindowSize;
  minSize: WindowSize;
  resizable: boolean;
  draggable: boolean;
}
