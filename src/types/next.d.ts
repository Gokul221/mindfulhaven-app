import { User } from "@primsa/client";

declare module "next" {
  interface NextApiRequest {
    user?: User;
  }
}
