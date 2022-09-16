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
        `http://localhost:8080/api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${req.cookies.refresh_token}`,
          },
        }
      );
      res.setHeader("Set-Cookie", [
        serialize("access_token", response.access_token, {
          path: "/",
          maxAge: 800,
          sameSite: "lax",
          httpOnly: false,
        }),
        serialize("refresh_token", response.refresh_token, {
          path: "/",
          maxAge: 604700,
          sameSite: "lax",
          httpOnly: true,
        }),
      ]);
      return res.status(200).json({ access_token: response.access_token });
    } catch (error) {
      return res.status(400).json({ message: "failure" });
    }
  }
}
