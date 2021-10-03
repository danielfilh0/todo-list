import React from "react";
import TodoList from "./components/TodoList";

const App = () => {
    const [task, setTask] = React.useState("");
    const [taskList, setTaskList] = React.useState([]);
    const [completedTaskList, setCompletedTaskList] = React.useState([]);
    const [activeTaskList, setActiveTaskList] = React.useState([]);
    const [todoListType, setTodoListType] = React.useState("all");

    function addStorage(value) {
        localStorage.setItem('tasklist', JSON.stringify(value));
    }

    function getStorage() {
        let localStorageTasks = localStorage.getItem('tasklist');

        if (localStorageTasks) {
            const localStorageTasks = JSON.parse(localStorage.getItem('tasklist'));
            setTaskList(localStorageTasks);
        }
    }

    function addTask(event) {
        event.preventDefault();
        if (task !== "") {
            const taskDetails = {
                id: Math.floor(Math.random() * 1000),
                value: task,
                isCompleted: false,
            };
            const updatedTasks = [...taskList, taskDetails];
            setTaskList(updatedTasks);
            addStorage(updatedTasks);
            setTask("");
        }
    }

    function completeTask(event, id) {
        event.preventDefault();
        const element = taskList.findIndex((elem) => elem.id === id);

        const newTaskList = [...taskList];

        if (newTaskList[element].isCompleted === false) {
            newTaskList[element] = {
                ...newTaskList[element],
                isCompleted: true,
            };
        } else {
            newTaskList[element] = {
                ...newTaskList[element],
                isCompleted: false,
            };
        }

        setTaskList(newTaskList);
        addStorage(newTaskList);
    }

    function deleteTask(event, id) {
        event.preventDefault();
        const updatedTasks = taskList.filter((item) => item.id !== id);
        setTaskList(updatedTasks);
        addStorage(updatedTasks);
    }

    function deleteAllTasks() {
        const tasks = [];
        setTaskList(tasks);
        addStorage(tasks);
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

    React.useEffect(() => {
        getStorage();
    }, [])

    return (
        <>
        <main className="todo-list container">
            <h1 className="todo__title">#todo</h1>

            <section className="todo__wrapper">
                <nav className="todo__nav">
                    <ul>
                        <li className={todoListType === 'all' ? 'is-active' : null} onClick={() => setTodoListType("all")}>All</li>
                        <li className={todoListType === 'active' ? 'is-active' : null} onClick={() => setTodoListType("active")}>
                            Active
                        </li>
                        <li className={todoListType === 'completed' ? 'is-active' : null} onClick={() => setTodoListType("completed")}>
                            Completed
                        </li>
                    </ul>
                </nav>

                <div className="todo__container">
                    {todoListType === "completed" ? null : (
                        <form className="todo__form" onSubmit={addTask}>
                            <input
                                type="text"
                                name="new-task"
                                id="new-task"
                                placeholder="add details"
                                value={task}
                                onChange={(event) =>
                                    setTask(event.target.value)
                                }
                            />
                            <button type="submit">Add</button>
                        </form>
                    )}

                    <div className="todo__list">
                        {todoListType === "all" ? (
                            <TodoList
                                taskList={taskList}
                                completeTask={completeTask}
                            />
                        ) : null}

                        {todoListType === "active" ? (
                            <TodoList
                                taskList={activeTaskList}
                                completeTask={completeTask}
                            />
                        ) : null}

                        {todoListType === "completed" ? (
                            <TodoList
                                taskList={completedTaskList}
                                setTaskList={setTaskList}
                                completeTask={completeTask}
                                deleteTask={deleteTask}
                                deleteAllTasks={deleteAllTasks}
                            />
                        ) : null}
                    </div>
                </div>
            </section>
        </main>
        <footer className="container">
                <p>created by <a href="https://github.com/danielfilh0" rel="noreferrer" target="_blank" title="Daniel Filho">danielfilh0</a> - devChallenges.io</p>
            </footer>
        </>
    );
};

export default App;
