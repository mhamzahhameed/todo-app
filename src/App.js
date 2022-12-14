import { useCallback, useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [dfault] = useState([
    "washing",
    "picking",
    "designing",
    "functioning",
    "sleeping",
  ]);

  // const [preArr, setPreArr] = useState([]);

  // Function to push in Array
  const addTask = useCallback(() => {
    if (task?.length) {
      setArr([...arr, task]);
      setTask("");
    } else {
      alert("Please enter your task");
    }
    // eslist-disable-next-line
  }, [arr, task]);

  // Function to add default Tasks in the task list
  const addDefaultTask = () => {
    dfault.map((v, i) => {
      return setTimeout(() => {
        setTask(v);
        setTimeout(() => {
          arr.push(v);

          setTask("");
        }, 500 * (i + 1));
      }, 2500 * (i + 1));
    });
    clearTimeout(addDefaultTask);
  };

  useEffect(() => {
    addDefaultTask();
    // eslint-disable-next-line
  }, []);

  const filterTasks = (e) => {
    if (e.target.value) {
      setSearchTerm(
        arr.filter((a) => {
          return a.toLowerCase().match(e.target.value.toLowerCase());
        })
      );
      // setArr(searchTerm);
    } else {
      setSearchTerm([]);
      // setArr(preArr);
    }
  };
  // Function to delete specific task
  const deleteTask = useCallback(
    (ind) => {
      arr?.splice(ind, 1);
      setArr([...arr]);
    },
    [arr]
  );

  return (
    <div className='App'>
      <input
        type='search'
        placeholder='Search'
        id='SearchInput'
        onChange={filterTasks}
      />
      <br />
      <br />
      <ul>
        {searchTerm?.map((a, i) => {
          return (
            <li
              key={i}
              style={{
                marginTop: "3px",
                listStyleType: "none",
              }}
            >
              <p style={{ fontFamily: "-moz-initial" }}>
                <b>{a}</b>
              </p>
            </li>
          );
        })}
      </ul>
      <h1>Todo App</h1>
      <br />
      <input
        type='text'
        name='task'
        onChange={(e) => setTask(e?.target?.value)}
        placeholder='Please enter the task here'
        value={task}
      />{" "}
      {/* Button to add current task in Array */}
      <button onClick={addTask} className='btn btn-primary'>
        Add task
      </button>
      <br />
      <br />
      {/* Displaying values of Array one by one */}
      <ol>
        {arr?.map((a, i) => {
          return (
            <li
              key={i}
              style={{
                marginTop: "3px",
                listStylePosition: "inside",
              }}
            >
              <span style={{ fontFamily: "-moz-initial" }}>
                <b>{a}</b>
              </span>{" "}
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => deleteTask(i)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default App;
