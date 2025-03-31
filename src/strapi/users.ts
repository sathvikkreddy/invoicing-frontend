"use server";

import { redirect } from "next/navigation";
import api from "~/lib/axios";
import { auth, signOut } from "~/server/auth";
import type { StrapiErrorT, StrapiUserT } from "~/types/strapi";

export const getUsers = async () => {
  const slnp_jwt = localStorage.getItem("slnp_jwt");
  if (!slnp_jwt) return null;
  try {
    const response = await api.get("/api/users", {
      headers: { Authorization: `Bearer ${slnp_jwt}` },
    });
    return response.data as StrapiUserT[];
  } catch (error) {
    return null;
  }
};

export const fetchMe = async () => {
  const session = await auth();
  if (session?.strapiToken) {
    try {
      const res = await api.get("/api/users/me", {
        headers: { Authorization: `Bearer ${session.strapiToken}` },
      });
      if (res.status !== 200) {
        return null;
      }
      return res.data as StrapiUserT;
    } catch (err: any) {
      if (err.response.status === 401) {
        await signOut();
        redirect("/");
      }
      return null;
    }
  }
  redirect("/");
};
