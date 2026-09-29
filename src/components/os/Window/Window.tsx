"use client";

import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "framer-motion";
import {
  Maximize2,
  Minimize2,
  Square,
  X,
} from "lucide-react";
import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useCallback,
  useState,
} from "react";

import { WINDOW_DEFINITIONS } from "@/config/os";
import type {
  WindowId,
  WindowPosition,
  WindowSize,
} from "@/types/window";

interface WindowProps {
  id: WindowId;
  title?: string;
  icon?: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  children: ReactNode;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onPositionChange?: (id: WindowId, position: WindowPosition) => void;
}

const OPEN_SPRING = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.8,
};

export function Window({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  size,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
}: WindowProps) {
  const definition = WINDOW_DEFINITIONS[id];

  const resolvedTitle = title ?? definition.title;

  const [isDragging, setIsDragging] = useState(false);

  const handleFocus = useCallback(() => {
    onFocus(id);
  }, [id, onFocus]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onFocus(id);
  }, [id, onFocus]);

  const handleDragEnd = useCallback(
    (_event: globalThis.MouseEvent | globalThis.TouchEvent | globalThis.PointerEvent, info: PanInfo) => {
      setIsDragging(false);

      if (isMaximized) {
        return;
      }

      onPositionChange?.(id, {
        x: position.x + info.offset.x,
        y: position.y + info.offset.y,
      });
    },
    [id, isMaximized, onPositionChange, position.x, position.y],
  );

  const handleTitleBarDoubleClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      onMaximize(id);
    },
    [id, onMaximize],
  );

  const handleControlClick = useCallback(
    (event: ReactMouseEvent, action: () => void) => {
      event.stopPropagation();
      action();
    },
    [],
  );

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.section
          key={id}
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 18,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.94,
            y: 18,
          }}
          transition={OPEN_SPRING}
          className="fixed"
          style={{
            zIndex,
            left: isMaximized ? 0 : position.x,
            top: isMaximized ? 0 : position.y,
            width: isMaximized ? "100vw" : size.width,
            height: isMaximized ? "100vh" : size.height,
          }}
          onMouseDown={handleFocus}
          onTouchStart={handleFocus}
          drag={!isMaximized && definition.draggable}
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{
            scale: isDragging ? 1.005 : 1,
          }}
        >
          <div
            className={[
              "aero-glass",
              "flex h-full min-h-0 flex-col overflow-hidden",
              "border border-white/50",
              "shadow-[0_18px_45px_rgba(0,35,80,0.38)]",
              "transition-[box-shadow,border-color]",
              "duration-200",
            ].join(" ")}
          >
            <div
              role="toolbar"
              aria-label={`${resolvedTitle} window controls`}
              className={[
                "flex h-10 shrink-0 select-none items-center",
                "border-b border-white/35",
                "bg-gradient-to-b from-white/45 via-white/20 to-white/5",
                "px-1",
                "backdrop-blur-md",
              ].join(" ")}
              onDoubleClick={handleTitleBarDoubleClick}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
                {icon && (
                  <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center"
                  >
                    {icon}
                  </span>
                )}

                <span className="truncate text-[13px] font-semibold text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
                  {resolvedTitle}
                </span>
              </div>

              <div className="flex h-full items-center gap-0.5">
                <button
                  type="button"
                  aria-label={`Minimize ${resolvedTitle}`}
                  title="Minimize"
                  className="flex h-7 w-9 items-center justify-center rounded-sm text-slate-800 transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  onClick={(event) =>
                    handleControlClick(event, () => onMinimize(id))
                  }
                >
                  <Minimize2 size={13} strokeWidth={2.2} />
                </button>

                <button
                  type="button"
                  aria-label={
                    isMaximized
                      ? `Restore ${resolvedTitle}`
                      : `Maximize ${resolvedTitle}`
                  }
                  title={isMaximized ? "Restore" : "Maximize"}
                  className="flex h-7 w-9 items-center justify-center rounded-sm text-slate-800 transition hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  onClick={(event) =>
                    handleControlClick(event, () => onMaximize(id))
                  }
                >
                  {isMaximized ? (
                    <Square size={12} strokeWidth={2.2} />
                  ) : (
                    <Maximize2 size={13} strokeWidth={2.2} />
                  )}
                </button>

                <button
                  type="button"
                  aria-label={`Close ${resolvedTitle}`}
                  title="Close"
                  className="flex h-7 w-10 items-center justify-center rounded-sm text-slate-800 transition hover:bg-red-500/85 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  onClick={(event) =>
                    handleControlClick(event, () => onClose(id))
                  }
                >
                  <X size={15} strokeWidth={2.4} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
