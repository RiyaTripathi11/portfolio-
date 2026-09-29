"use client";

import { useCallback, useMemo, useState } from "react";

import {
  DEFAULT_WINDOW_Z_INDEX,
  WINDOW_DEFINITIONS,
} from "@/config/os";
import type {
  WindowId,
  WindowState,
} from "@/types/window";

const createInitialWindows = (): WindowState[] =>
  Object.values(WINDOW_DEFINITIONS).map((windowDefinition, index) => ({
    id: windowDefinition.id,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: DEFAULT_WINDOW_Z_INDEX + index,
    position: {
      x: 120 + index * 24,
      y: 70 + index * 24,
    },
    size: windowDefinition.defaultSize,
  }));

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(
    createInitialWindows,
  );

  const highestZIndex = useMemo(
    () =>
      windows.reduce(
        (highest, window) => Math.max(highest, window.zIndex),
        DEFAULT_WINDOW_Z_INDEX,
      ),
    [windows],
  );

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((currentWindows) => {
      const nextZIndex =
        Math.max(
          ...currentWindows.map((window) => window.zIndex),
          DEFAULT_WINDOW_Z_INDEX,
        ) + 1;

      return currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              isMinimized: false,
              zIndex: nextZIndex,
            }
          : window,
      );
    });
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      setWindows((currentWindows) => {
        const nextZIndex =
          Math.max(
            ...currentWindows.map((window) => window.zIndex),
            DEFAULT_WINDOW_Z_INDEX,
          ) + 1;

        return currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,
                isOpen: true,
                isMinimized: false,
                zIndex: nextZIndex,
              }
            : window,
        );
      });
    },
    [],
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              isOpen: false,
              isMinimized: false,
            }
          : window,
      ),
    );
  }, []);

  const updateWindowPosition = useCallback(
    (id: WindowId, position: { x: number; y: number }) => {
      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,
                position,
              }
            : window,
        ),
      );
    },
    [],
  );

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              isMinimized: true,
            }
          : window,
      ),
    );
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              isMaximized: !window.isMaximized,
              isMinimized: false,
            }
          : window,
      ),
    );
  }, []);

  const toggleWindow = useCallback(
    (id: WindowId) => {
      const targetWindow = windows.find((window) => window.id === id);

      if (!targetWindow || !targetWindow.isOpen) {
        openWindow(id);
        return;
      }

      if (targetWindow.isMinimized) {
        focusWindow(id);
        return;
      }

      minimizeWindow(id);
    },
    [windows, openWindow, focusWindow, minimizeWindow],
  );

  return {
    windows,
    highestZIndex,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    toggleWindow,
    updateWindowPosition,
  };
}
