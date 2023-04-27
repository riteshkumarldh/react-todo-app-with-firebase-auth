import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebaseContext";

const Home = () => {
  const { isLoggedIn, loading, setLoading } = useFirebase();
  const navigate = useNavigate();

  const [todoInput, setTododInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!isLoggedIn) {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, isLoggedIn, setLoading]);

  // adding todo
  const handleTodoInput = (e) => {
    e.preventDefault();
    if (!todoInput) return;

    if (!edit) {
      // new todo
      setTodos([
        ...todos,
        {
          status: false,
          work: todoInput,
          id: Date.now(),
        },
      ]);
    } else {
      // edit
      setEdit(false);
      const newArr = [...todos];
      newArr.forEach((todo) => {
        if (todo.id === editId) {
          todo.work = todoInput;
        }
      });

      setTodos([...newArr]);

      // ======= other way of editing but not right
      // todos.forEach((todo) => {
      //   if (todo.id === editId) {
      //     const filtered = todos.filter((todo) => {
      //       return todo.id !== editId;
      //     });
      //     setTodos(
      //       [
      //         ...filtered,
      //         {
      //           id: Date.now(),
      //           work: todoInput,
      //           status: false,
      //         },
      //       ].reverse()
      //     );
      //   }
      // });
    }
    setTododInput("");
  };

  // delete todo
  const handleDelete = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  // edit todo
  const handleEdit = (id) => {
    setEdit(true);
    setEditId(id);

    todos.forEach((todo, i) => {
      if (todo.id === id) {
        setTododInput(todos[i].work);
      }
    });
  };

  // checkbox status changing
  const handleCheckbox = (e, id) => {
    // setStatus(e.target.checked);
    const arr = [...todos];
    arr.forEach((item) => {
      if (item.id === id) {
        item.status = e.target.checked;
      }
    });

    setTodos([...arr]);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <Header />
          <div className="flex flex-col justify-center my-10 max-w-2xl w-full mx-auto px-5">
            <form
              className="max-w-2xl w-full mx-auto"
              onSubmit={handleTodoInput}
            >
              <div className="h-16 flex">
                <input
                  className="h-full border border-blue-300 outline-none w-full text-lg md:text-xl lg:text-2xl px-2 md:px-3 lg:px-4"
                  type="text"
                  placeholder="Enter todos..."
                  value={todoInput}
                  onChange={(e) => setTododInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-slate-900 h-full text-slate-100 text-3xl px-4"
                >
                  <i className="bx bx-plus "></i>
                </button>
              </div>
            </form>

            {todos.length > 0 ? (
              <ul className="border">
                {todos.map((todo) => {
                  return (
                    <li
                      key={todo.id}
                      className="flex justify-between px-2 py-2 hover:bg-blue-100 border"
                    >
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          id={todo.id}
                          checked={todo.status}
                          onChange={(e) => handleCheckbox(e, todo.id)}
                        />
                        <label
                          htmlFor={todo.id}
                          className={`text-base md:text-lg ${
                            todo.status ? "line-through opacity-50" : null
                          }`}
                        >
                          {todo.work}
                        </label>
                      </div>
                      <div className="flex gap-5">
                        <button onClick={() => handleEdit(todo.id)}>
                          <i className="bx bxs-edit text-yellow-500 text-lg"></i>
                        </button>
                        <button onClick={() => handleDelete(todo.id)}>
                          <i className="bx bx-trash text-red-600 text-lg"></i>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h1 className="font-semibold text-center mt-10">
                No todos Found 😵
              </h1>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
