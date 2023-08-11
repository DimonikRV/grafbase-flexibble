import {
  ICloudinaryEnv,
  IGoogleEnv,
  IGrafbaseEnv,
  INextAuthEnv,
  UnionEnvType,
  ConstantType,
} from "./common.types";

export const cloud: ICloudinaryEnv = {
  cloudinaryName: process.env.CLOUDINARY_NAME!,
  cloudinaryKey: process.env.CLOUDINARY_KEY!,
  cloudinarySecret: process.env.CLOUDINARY_SECRET!,
};
export const google: IGoogleEnv = {
  googleId: process.env.GOOGLE_CLIENT_ID!,
  googleSecret: process.env.GOOGLE_CLIENT_SECRET!,
};

export const grafbase: IGrafbaseEnv = {
  grafbaseApiUrl: process.env.NEXT_PUBLIC_GRAFBASE_API_URL!,
  grafbaseApiKey: process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!,
};
export const nextAuth: INextAuthEnv = {
  nextSecret: process.env.NEXTAUTH_SECRET!,
  nextUrl: process.env.NEXTAUTH_URL!,
};

export function getEnv(type: ConstantType): UnionEnvType {
  if (type === "cloudinary") {
    return cloud;
  } else if (type === "google") {
    return google;
  } else if (type === "grafbase") {
    return grafbase;
  } else return nextAuth;
}
