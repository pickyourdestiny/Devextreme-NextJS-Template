import PageContent from "../components/layout/pageContent";
import { Suspense } from "react";
import Loading from "../loading";

export default function AuthenticatedLayout({ children }) {
  return (
    <PageContent>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </PageContent>
  );
}
