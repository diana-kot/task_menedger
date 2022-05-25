import TaskTable from "../TaskTable";

import "./TaskList.scss";

const TaskList = () => {
  return (
    <>
    <div className="table__container">

    <h3 className="table__tatle">Таблица задач</h3>
    <TaskTable/>
    </div>
      
  
    </>
  );
};

export default TaskList;
