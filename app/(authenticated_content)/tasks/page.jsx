import "./tasks.scss";
import { checkSession } from "@/app/api/auth/customAuth";
import { TaskListComponent } from "@/app/components/taskList/taskList";

export const metadata = {
  title: "Tasks Page",
  description: "Tasks page of my awesome Web App",
};

export default async function Tasks() {
  // the following code will protect the page and prevent users who are not signed in from accessing it.
  // await checkSession();

  return (
    <>
      <TaskListComponent />
    </>
  );
}
