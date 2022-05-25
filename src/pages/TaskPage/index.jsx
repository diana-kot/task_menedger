import TaskList from "@components/Tasks/TaskList";
import { Head } from "@components";

import "./TaskPage.scss";

const TaskPage = () => {
  return (
    <>
      <Head />
      <div>
        <TaskList />
      </div>
    </>
  );
};

export default TaskPage;
