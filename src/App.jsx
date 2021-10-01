import React from "react";

const App = () => {
    const [task, setTask] = React.useState("");
    const [taskList, setTaskList] = React.useState([]);
    const [completedTaskList, setCompletedTaskList] = React.useState([]);
    const [activeTaskList, setActiveTaskList] = React.useState([]);

    function addTask(event) {
        event.preventDefault();
        if (task !== "") {
            const taskDetails = {
                id: Math.floor(Math.random() * 1000),
                value: task,
                isCompleted: false,
            };
            setTaskList([...taskList, taskDetails]);
            setTask("");
        }
    }

    function completeTask(event, id) {
        event.preventDefault();
        const element = taskList.findIndex(elem => elem.id === id);

        const newTaskList = [...taskList];

        if (newTaskList[element].isCompleted === false) {
            newTaskList[element] = {
                ...newTaskList[element],
                isCompleted: true,
            }
        } else {
            newTaskList[element] = {
                ...newTaskList[element],
                isCompleted: false,
            }
        }

        setTaskList(newTaskList);
    }

    function deleteTask(event, id) {
        event.preventDefault();
        setTaskList(taskList.filter((item) => item.id !== id));
    }

    React.useEffect(() => {
        function getCompletedList() {
            setCompletedTaskList(
                taskList.filter((item) => item.isCompleted === true)
            );
        }

        function getActiveList() {
            setActiveTaskList(
                taskList.filter((item) => item.isCompleted === false)
            );
        }

        getCompletedList();
        getActiveList();

    }, [taskList]);

    return (
        <main className="todo-list container">
            <h1 className="todo__title">#todo</h1>
            <section className="todo__wrapper">
                <nav className="todo__nav">
                    <ul>
                        <li>All</li>
                        <li>Active</li>
                        <li>Completed</li>
                    </ul>
                </nav>
                <div className="todo__container">
                    <form className="todo__form" onSubmit={addTask}>
                        <input
                            type="text"
                            name="new-task"
                            id="new-task"
                            placeholder="add details"
                            value={task}
                            onChange={(event) => setTask(event.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>
                    {taskList === [] ? null : (
                        <div className="todo__list">
                            <p>All</p>
                            {taskList.map((task, index) => (
                                <div key={index}>
                                    <span>{task.value}</span>
                                    <button
                                        onClick={(event) =>
                                            deleteTask(event, task.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button onClick={(event) => completeTask(event, task.id)}>Complete</button>
                                </div>
                            ))}

                            <hr />
                            <p>Completed</p>
                            {completedTaskList.map((task, index) => (
                                <div key={index}>
                                    <span>
                                        {task.value}
                                    </span>
                                    <button
                                        onClick={(event) =>
                                            deleteTask(event, task.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button onClick={(event) => completeTask(event, task.id)}>Complete</button>
                                </div>
                            ))}

                                <hr />
                            <p>Active</p>
                            {activeTaskList.map((task, index) => (
                                <div key={index}>
                                    <span>
                                        {task.value}
                                        <button
                                        onClick={(event) =>
                                            deleteTask(event, task.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button onClick={(event) => completeTask(event, task.id)}>Complete</button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default App;
