import { Input } from "antd";

import { Block, Button } from "@components";
import "./CreateTask.scss";

import addSvg from "../../assets/img/add.svg";

const CreateTask = (props) => {
  const {
    addTask,
    username,
    email,
    text,
    status,
    handleSubmit,
    onChangeUsername,
    onChangeEmail,
    onChangeStatusTask,
    onChangeTaskText,
    visibleForm,
    setFormVisible,
    isLoading,
    setIsLoading,
    toggleFormVisible
  } = props;

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <Block className="block__task">
          <div className="tasks__form-block">
            <form onSubmit={handleSubmit}>
              <div className="tasks__form-input">
                <Input
                  size="large"
                  value={username}
                  className="field"
                  type="text"
                  placeholder="Имя пользователя"
                  onChange={onChangeUsername}
                />
                <Input
                  size="large"
                  value={email}
                  className="field"
                  type="email"
                  placeholder="e-mail"
                  onChange={onChangeEmail}
                />
                <Input
                  size="large"
                  value={text}
                  className="field"
                  type="text"
                  placeholder="Текст задачи"
                  onChange={onChangeTaskText}
                />
                <Input
                  size="large"
                  value={status}
                  className="field"
                  type="text"
                  placeholder="Статус задачи"
                  onChange={onChangeStatusTask}
                />
              </div>

              <Button disabled={isLoading} onClick={addTask} className="button">
                {isLoading ? "Добавление..." : "Добавить задачу"}
              </Button>
              <Button
                onClick={toggleFormVisible}
                className="button button--grey"
              >
                Отмена
              </Button>
            </form>
          </div>
        </Block>
      )}
    </div>
  );
};

export default CreateTask;
