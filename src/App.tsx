import React from "react";
import "./App.css";
import TodoList from "./todoList/TodoList";

function App() {
	return (
		<div className="App">
			<header className="App-header">todos</header>
			<div className="App-content">
				<TodoList />
			</div>
		</div>
	);
}

export default App;
