import "./tasks.scss";
import dynamic from "next/dynamic";
import { checkSession } from "@/app/api/auth/customAuth";

export const metadata = {
  title: "Tasks Page",
  description: "Tasks page of my awesome Web App",
};

const TaskList = dynamic(() => import("../../components/taskList/taskList"), {
  ssr: false,
});

export default async function Tasks() {
  // the following code will protect the page and prevent users who are not signed in from accessing it.
  // await checkSession();

  return (
    <>
      <TaskList />
    </>
  );
}
