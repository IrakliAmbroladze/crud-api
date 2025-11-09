import type { User } from "../types/user.js";
import { randomUUID } from "node:crypto";

const db = new Map<string, User>();

export const userService = {
  async getAll(): Promise<User[]> {
    return Array.from(db.values());
  },

  async getById(id: string): Promise<User | null> {
    return db.get(id) ?? null;
  },

  async create(payload: Omit<User, "id">): Promise<User> {
    const id = randomUUID();
    const user: User = { id, ...payload };
    db.set(id, user);
    return user;
  },

  async update(
    id: string,
    payload: Partial<Omit<User, "id">>,
  ): Promise<User | null> {
    const existing = db.get(id);
    if (!existing) return null;
    const updated: User = { ...existing, ...payload, id };
    db.set(id, updated);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    return db.delete(id);
  },

  async clear(): Promise<void> {
    db.clear();
  },
};
