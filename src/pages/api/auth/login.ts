import axios from "axios";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { data: response } = await axios.post(
        `${process.env.NEXT_APP_API_URL}/api/auth/login`,
        req.body
      );
      res.setHeader("Set-Cookie", [
        serialize("access_token", response.access_token, {
          path: "/",
          maxAge: 899,
          sameSite: "lax",
          httpOnly: false,
        }),
        serialize("refresh_token", response.refresh_token, {
          path: "/",
          maxAge: 604799,
          sameSite: "lax",
          httpOnly: true,
        }),
      ]);
      return res.status(200).json({ message: "success", role: response.role });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "failure" });
    }
  }
}
