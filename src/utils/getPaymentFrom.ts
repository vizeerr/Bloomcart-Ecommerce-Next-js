import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getPaymentFrom = (request: NextRequest) => {
  try {
    const token = request.cookies.get("sessionId")?.value || "";
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.sessionId;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
