import TaskList  from "@components/Tasks/TaskList";

import "./TaskPage.scss";

const TaskPage = () => {
  return (
    <>
      <div className="main">
        <TaskList/>
      </div>
    </>
  );
};

export default TaskPage;
