import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { INextAuthEnv } from "@/common.types";
import { getEnv } from "@/env-utils";

const { nextSecret } = getEnv("next") as INextAuthEnv;

const secret = nextSecret;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  return NextResponse.json({ token }, { status: 200 });
}
