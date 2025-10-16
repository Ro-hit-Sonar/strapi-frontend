"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Sign In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Create a new account to get started"}
          </DialogDescription>
        </DialogHeader>

        {mode === "login" ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSwitchToSignup={() => setMode("signup")}
          />
        ) : (
          <SignupForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setMode("login")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
