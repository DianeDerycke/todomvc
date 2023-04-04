import "./TodoList.css";
import TaskSection from "./Task/TaskSection";
import { useState } from "react";

export type Todo = {
	id: string;
	label: string;
	isCompleted: boolean;
};

type Categories = "all" | "active" | "completed";

function TodoList() {
	const [inputText, setInputText] = useState("");
	const [tasks, setTasks] = useState(new Map<Todo["id"], Omit<Todo, "id">>());
	const [currentCategory, setCurrentCategory] = useState<Categories>("all");

	const addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
		if (inputText.trim()) {
			event.preventDefault();
			tasks.set(crypto.randomUUID(), {
				label: inputText.trim(),
				isCompleted: false,
			});
			setInputText("");
		}
	};

	function handleClick(key: string) {
		const newMap = new Map(tasks);
		newMap.delete(key);
		setTasks(newMap);
	}

	function handleToggle(key: string) {
		const newMap = new Map(tasks);
		const currentTask = newMap.get(key);
		if (currentTask) {
			currentTask.isCompleted = !currentTask.isCompleted;
			newMap.set(key, currentTask);
		}
		setTasks(newMap);
	}

	function handleClickCategory(category: Categories) {
		setCurrentCategory(category);
	}

	function getListByCategory() {
		switch (currentCategory) {
			case "all":
				return Array.from(tasks);
			case "active":
				return Array.from(tasks).filter(([key, todo]) => !todo.isCompleted);
			case "completed":
				return Array.from(tasks).filter(([key, todo]) => todo.isCompleted);
		}
	}

	function handleClearCompleted() {
		const clearedMap = new Map(
			Array.from(tasks).filter(([key, todo]) => !todo.isCompleted)
		);
		setTasks(clearedMap);
	}

	function handleCompleteAll() {
		const completedTasks = new Map(tasks);
		completedTasks.forEach((task) => {
			task.isCompleted = true;
		});
		setTasks(completedTasks);
	}
	function handleOnSubmitTaskValue(input: string, key: string) {
		const newMap = new Map(tasks);
		const currentTask = newMap.get(key);
		if (currentTask) {
			currentTask.label = input;
			newMap.set(key, currentTask);
			setTasks(newMap);
		}
	}

	const taskSectionList = getListByCategory().map(([key, todo]) => {
		return (
			<TaskSection
				key={key}
				todo={todo}
				onClick={() => handleClick(key)}
				onCheck={() => handleToggle(key)}
				onSubmitTaskValue={(input) => handleOnSubmitTaskValue(input, key)}
			/>
		);
	});

	const leftTasksCount = Array.from(tasks).filter(
		([key, todo]) => !todo.isCompleted
	).length;

	return (
		<div className="todo-list__wrapper">
			<header>
				<button className="arrow" onClick={handleCompleteAll}></button>
				<form onSubmit={addTask} className="todo-list__wrapper__form">
					<input
						className="todo-list__input"
						type="text"
						name="todo-list"
						placeholder={"What needs to be Done ?"}
						autoComplete="off"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
					/>
				</form>
			</header>
			<div className="todo-list__list">{taskSectionList}</div>
			{tasks.size > 0 ? (
				<footer className="todo-list__footer">
					{leftTasksCount} items left
					<div className="todo-list__footer__btn-group">
						<button
							className={currentCategory === "all" ? "--active" : ""}
							onClick={() => handleClickCategory("all")}
						>
							All
						</button>
						<button
							className={currentCategory === "active" ? "--active" : ""}
							onClick={() => handleClickCategory("active")}
						>
							Active
						</button>
						<button
							className={currentCategory === "completed" ? "--active" : ""}
							onClick={() => handleClickCategory("completed")}
						>
							Completed
						</button>
					</div>
					<button
						onClick={handleClearCompleted}
						className="todo-list__footer__btn__completed"
					>
						Clear completed
					</button>
				</footer>
			) : null}
		</div>
	);
}

export default TodoList;
