"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/config";

interface ContactDialogContextValue {
  openContact: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextValue>({
  openContact: () => {},
});

export function useContactDialog() {
  return useContext(ContactDialogContext);
}

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactDialogContext.Provider value={{ openContact: () => setOpen(true) }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Get in touch</DialogTitle>
            <DialogDescription>
              I&apos;m happy to discuss projects, collaboration or internships.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            <div>
              <strong>Email:</strong>{" "}
              <Link className="text-primary underline" href={`mailto:${siteConfig.author.email}`}>
                {siteConfig.author.email}
              </Link>
            </div>
            <div>
              <strong>LinkedIn:</strong>{" "}
              <Link
                className="text-primary underline"
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.social.linkedin}
              </Link>
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button asChild>
                <Link href={`mailto:${siteConfig.author.email}`}>Email me</Link>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
}
