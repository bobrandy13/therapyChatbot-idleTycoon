import { ISODateString } from "next-auth";

export default interface SessionType {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
  };
  expires: ISODateString;
}
