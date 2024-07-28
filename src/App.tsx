import { ChangeEvent, FormEvent, useState } from "react";

function App() {
  interface tasks {
    title: string;
    isCompleted: boolean;
  }

  const [task, setTask] = useState<string>("");
  const [allTasks, setAllTasks] = useState<tasks[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = task;
    setAllTasks((tasks) => [...tasks, { title, isCompleted: false }]);
    setTask("");
  };

  const handleDeleteTask = (i: number) => {
    setAllTasks((tasks) => tasks.filter((task) => task !== tasks[i]));
  };

  const handleCheckBoxChange = (
    i: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setAllTasks((tasks) =>
      tasks.map((task, index) =>
        index === i ? { ...task, isCompleted: e.target.checked } : task
      )
    );
  };

  return (
    <div style={{ fontFamily: "cursive", fontWeight: "500" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={task}
          placeholder="Write your text here..."
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
      <br />
      <br />

      <div>
        {allTasks.map((task: tasks, index: number) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            key={index}
          >
            <input
              checked={task.isCompleted}
              type="checkbox"
              onChange={(e) => handleCheckBoxChange(index, e)}
            />

            <span
              style={task.isCompleted ? { textDecoration: "line-through" } : {}}
            >
              {task.title}
            </span>

            <span onClick={() => handleDeleteTask(index)}>X</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
