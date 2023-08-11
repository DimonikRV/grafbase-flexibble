import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}
export interface IEnvReturns {
  cloudinaryName: string;
  cloudinaryKey: string;
  cloudinarySecret: string;
  googleId: string;
  googleSecret: string;
  grafbaseApiUrl: string;
  grafbaseApiKey: string;
  nextSecret: string;
  nextUrl: string;
}

export interface ICloudinaryEnv
  extends Pick<
    IEnvReturns,
    "cloudinaryKey" | "cloudinaryName" | "cloudinarySecret"
  > {}
export interface IGoogleEnv
  extends Pick<IEnvReturns, "googleId" | "googleSecret"> {}
export interface IGrafbaseEnv
  extends Pick<IEnvReturns, "grafbaseApiKey" | "grafbaseApiUrl"> {}

export interface INextAuthEnv
  extends Pick<IEnvReturns, "nextSecret" | "nextUrl"> {}
export type UnionEnvType =
  | ICloudinaryEnv
  | IGoogleEnv
  | IGrafbaseEnv
  | INextAuthEnv;

export type ConstantType = "cloudinary" | "google" | "grafbase" | "next";
