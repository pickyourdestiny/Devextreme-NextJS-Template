import { Suspense } from "react";
import Loading from "../loading";

export default function UnauthenticatedLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
