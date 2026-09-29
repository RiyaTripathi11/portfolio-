"use client";

import {
  Folder,
  Mail,
  Terminal,
  User,
} from "lucide-react";
import { useMemo } from "react";

import { WINDOW_DEFINITIONS } from "@/config/os";
import { Window } from "@/components/os/Window/Window";
import { useWindowManager } from "@/components/os/Window/WindowManager";
import type { WindowId } from "@/types/window";

const WINDOW_ICONS: Record<WindowId, React.ReactNode> = {
  about: <User size={16} />,
  projects: <Folder size={16} />,
  skills: <Terminal size={16} />,
  experience: <Folder size={16} />,
  resume: <Folder size={16} />,
  terminal: <Terminal size={16} />,
  contact: <Mail size={16} />,
};

const DESKTOP_ICONS: Array<{
  id: WindowId;
  label: string;
}> = [
  { id: "about", label: "About Riya" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "terminal", label: "Command Prompt" },
];

export function Desktop() {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  const windowMap = useMemo(
    () =>
      new Map(
        windows.map((window) => [window.id, window]),
      ),
    [windows],
  );

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Desktop background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.28),transparent_35%),linear-gradient(180deg,#4f9fd7_0%,#2475b7_45%,#14558e_100%)]" />

      {/* Aero light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"
      />

      {/* Desktop icons */}
      <div className="relative z-10 flex h-full flex-col items-start gap-3 p-4">
        {DESKTOP_ICONS.map((desktopIcon) => (
          <button
            key={desktopIcon.id}
            type="button"
            onDoubleClick={() => openWindow(desktopIcon.id)}
            className="group flex w-24 flex-col items-center gap-1 rounded-md p-2 text-center text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            title={`Double-click to open ${desktopIcon.label}`}
          >
            <span className="flex size-12 items-center justify-center rounded-lg border border-white/40 bg-white/20 shadow-lg backdrop-blur-md transition group-hover:scale-105 group-hover:bg-white/30">
              {WINDOW_ICONS[desktopIcon.id]}
            </span>

            <span className="text-xs font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              {desktopIcon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((windowState) => {
        const definition = WINDOW_DEFINITIONS[windowState.id];

        return (
          <Window
            key={windowState.id}
            id={windowState.id}
            title={definition.title}
            icon={WINDOW_ICONS[windowState.id]}
            isOpen={windowState.isOpen}
            isMinimized={windowState.isMinimized}
            isMaximized={windowState.isMaximized}
            zIndex={windowState.zIndex}
            position={windowState.position}
            size={windowState.size}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onPositionChange={updateWindowPosition}
          >
            <div className="flex min-h-full flex-col p-6">
              <h1 className="text-2xl font-semibold text-slate-900">
                {definition.title}
              </h1>

              <p className="mt-2 text-sm text-slate-700">
                This window is part of Riya Tripathi&apos;s interactive
                Windows 7 portfolio.
              </p>

              <div className="mt-6 rounded-lg border border-white/60 bg-white/30 p-4 shadow-inner">
                <p className="text-sm text-slate-800">
                  Content for this section will be added in the next
                  implementation phase.
                </p>
              </div>
            </div>
          </Window>
        );
      })}

      {/* Temporary taskbar */}
      <div className="absolute inset-x-0 bottom-0 z-[9999] flex h-12 items-center border-t border-white/40 bg-slate-900/45 px-2 shadow-[0_-4px_18px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => openWindow("about")}
          className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white shadow-lg transition hover:scale-105 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Open About Riya"
          title="About Riya"
        >
          <User size={19} />
        </button>

        <div className="ml-2 flex items-center gap-1">
          {Array.from(windowMap.values())
            .filter((window) => window.isOpen)
            .map((window) => (
              <button
                key={window.id}
                type="button"
                onClick={() => focusWindow(window.id)}
                className="max-w-40 truncate rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
              >
                {WINDOW_DEFINITIONS[window.id].title}
              </button>
            ))}
        </div>
      </div>
    </main>
  );
}
