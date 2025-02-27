import "./tasks.scss";
import { checkSession } from "@/app/api/auth/customAuth";
import Title from "@/app/components/layout/title/title";
import TaskList from "@/app/components/taskList/taskList";

export const metadata = {
  title: "Tasks Page",
  description: "Tasks page of my awesome Web App",
};

export default async function Tasks() {
  // const session = await checkSession();
  // console.log(session);

  return (
    <>
      <Title text="task list"></Title>
      <TaskList />
    </>
  );
}
