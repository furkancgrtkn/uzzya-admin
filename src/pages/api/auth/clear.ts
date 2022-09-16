import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      res.setHeader("Set-Cookie", [
        serialize("refresh_token", "", {
          path: "/",
          maxAge: 1,
          sameSite: "lax",
          httpOnly: true,
        }),
      ]);
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ message: "failure" });
    }
  }
}
