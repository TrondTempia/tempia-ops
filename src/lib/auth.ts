import { supabase } from "./supabaseClient";
import { User, Session } from "@supabase/supabase-js";

export interface AuthUser extends User {
  role?: "admin" | "viewer";
}

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const role = user.app_metadata?.role || "admin";
    return { ...user, role };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const getCurrentSession = async (): Promise<Session | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getUserRole = (user: User | null): "admin" | "viewer" => {
  if (!user) return "viewer";
  return user.app_metadata?.role || "admin";
};