"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <div className="md:hidden">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[80%] max-w-xs flex-col border-l border-border bg-card p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-sm text-muted-foreground">
                  Menu
                </span>
                <Button
                  ref={closeRef}
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
