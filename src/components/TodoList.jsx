import React from "react";

const TodoList = ({ taskList, setTaskList, completeTask, deleteTask, deleteAllTasks }) => {
    if (taskList === []) return <p>Nothing yet =(</p>;
    return (
        <>
            {taskList.map((task, index) => (
                <div
                    className={
                        taskList[index].isCompleted
                            ? "todo__task completed"
                            : "todo__task"
                    }
                    key={index}
                >
                    <button
                        className="checkbox"
                        onClick={(event) => completeTask(event, task.id)}
                    ></button>
                    <span onClick={(event) => completeTask(event, task.id)}>
                        {task.value}
                    </span>
                    {deleteTask ? (
                        <button
                            className="delete"
                            onClick={(event) => deleteTask(event, task.id)}
                        >
                            <i class="far fa-trash-alt"></i>
                        </button>
                    ) : null}
                </div>
            ))}
            {}
            {deleteTask && (taskList.length > 0) ? (
                <button
                    className="delete-all"
                    onClick={deleteAllTasks}
                >
                    <i class="far fa-trash-alt"></i>
                    <span>delete all</span>
                </button>
            ) : null}
        </>
    );
};

export default TodoList;
