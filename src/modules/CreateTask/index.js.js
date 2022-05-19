export { default } from './CreateTask';






// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// import {
//   createTask,
//   setTaskId,
//   setTaskUserName,
//   setTaskEmail,
//   setTaskText,
//   setTaskStatus,
// } from "@store/CreateTask/actions";

// import { CreateTask as CreateTaskBase } from "@components";

// const CreateTask = () => {





//   const dispatch = useDispatch();
//   const { id, username, email, text, status } = useSelector(({ task }) => task);

//   const taskSelector = state => state.task.task
//   const task = useSelector(taskSelector);
 

//   const [visibleForm, setFormVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const toggleFormVisible = () => {
//     setFormVisible(!visibleForm);
//   };

//   const addTask = async (task) => {
//    try {
//     dispatch(
//       createTask({
//         id: task.id,
//         username: task.username,
//         email: task.email,
//         text: task.text,
//         status: task.status,
//       })
//     );

//     const {data} = await axios.post("https://624d2702d71863d7a8141512.mockapi.io/carts", task);
//    } catch (error) {
//     alert("Не получилось добавить задачу");
//     console.error(error);
//    }
  
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTask()
//     setFormVisible(false)
    
//   };

//   const onChangeUsername = (e) => {
//     dispatch(setTaskUserName(e.target.value));
//   };

//   const onChangeEmail = (e) => {
//     dispatch(setTaskEmail(e.target.value));
//   };

//   const onChangeStatusTask = (e) => {
//     dispatch(setTaskStatus(e.target.value));
//   };

//   const onChangeTaskText = (e) => {
//     dispatch(setTaskText(e.target.value));
//   };

  

//   return (
//     <CreateTaskBase
//       addTask={addTask}
//       username={username}
//       email={email}
//       text={text}
//       status={status}
//       handleSubmit={handleSubmit}
//       onChangeUsername={onChangeUsername}
//       onChangeEmail={onChangeEmail}
//       onChangeStatusTask={onChangeStatusTask}
//       onChangeTaskText={onChangeTaskText}
//       visibleForm={visibleForm}
//       setFormVisible={setFormVisible}
//       isLoading={isLoading}
//       setIsLoading={setIsLoading}
//       toggleFormVisible={toggleFormVisible}
//     />
//   );
// };

// export default connect()(CreateTask);
