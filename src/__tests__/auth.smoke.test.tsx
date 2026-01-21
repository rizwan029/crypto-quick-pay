import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Profile from "@/pages/Profile";
import * as auth from "@/contexts/AuthProvider";

describe("Profile smoke", () => {
  it("renders sign-in prompt when no user", () => {
    vi.spyOn(auth as any, "useAuth").mockReturnValue({ user: null, loading: false, signOut: async () => {}, setRedirect: () => {}, getRedirect: () => null });

    render(<Profile />);
    expect(screen.getByText(/Profil/i)).toBeTruthy();
    expect(screen.getByText(/Anda belum masuk/i)).toBeTruthy();
  });
});