import "./TaskSection.css";
import { useState } from "react";

import type { Todo } from "../TodoList";

type Props = {
	todo: Omit<Todo, "id">;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	onCheck: () => void;
	onSubmitTaskValue: (input: string) => void;
};

function TaskSection(props: Props) {
	const { todo, onCheck, onClick, onSubmitTaskValue } = props;

	const [readOnly, setReadOnly] = useState(true);
	const [input, setInput] = useState(todo.label);

	const handleInputBlur = () => {
		onSubmitTaskValue(input);
		setReadOnly(false);
	};

	return (
		<div className="task-section__wrapper">
			<input
				type="checkbox"
				className="task-section__checkbox"
				checked={todo.isCompleted}
				onChange={onCheck}
			></input>
			<input
				className={`task-section__input ${
					todo.isCompleted ? "--overline" : null
				}`}
				readOnly={readOnly}
				onClick={() => setReadOnly(false)}
				onBlur={handleInputBlur}
				value={input}
				onChange={(e) => setInput(e.target.value)}
			></input>
			<div className={"task-section__delete-btn"}>
				<button onClick={onClick}></button>
			</div>
		</div>
	);
}

export default TaskSection;
