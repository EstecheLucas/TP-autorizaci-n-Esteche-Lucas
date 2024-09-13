export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";


  const form = document.createElement("form");
  form.classList.add("bg-white", "p-4", "rounded", "shadow-md", "mb-4");

  const inputTitle = document.createElement("input");
  inputTitle.classList.add("border", "px-4", "py-2", "mb-2", "w-full");
  inputTitle.type = "text";
  inputTitle.placeholder = "Título de la tarea";
  inputTitle.required = true;

  const inputCompleted = document.createElement("input");
  inputCompleted.classList.add("mr-2");
  inputCompleted.type = "checkbox";
  inputCompleted.id = "completed";

  const labelCompleted = document.createElement("label");
  labelCompleted.setAttribute("for", "completed");
  labelCompleted.textContent = "Completado";

  const btnSubmit = document.createElement("button");
  btnSubmit.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600"
  );
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Agregar Tarea";

  form.appendChild(inputTitle);
  form.appendChild(inputCompleted);
  form.appendChild(labelCompleted);
  form.appendChild(btnSubmit);

  
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = inputTitle.value;
    const completed = inputCompleted.checked;

    fetch("http://localhost:4000/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        completed,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
       
        console.log("Tarea agregada:", data);
       
        inputTitle.value = "";
        inputCompleted.checked = false;
        loadTodos(); 
      })
      .catch((error) => {
        console.error("Error al agregar la tarea:", error);
      });
  });

  const table = document.createElement("table");
  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Acciones";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");

  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(form); 
  container.appendChild(title);
  container.appendChild(table);
  const loadTodos = () => {
    fetch("http://localhost:4000/todos", {
      credentials: "include", 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.todos) {
          throw new Error("Formato de datos inesperado");
        }

       
        tbody.innerHTML = "";

       
        data.todos.forEach((todo) => {
          const tr = document.createElement("tr");

          const td1 = document.createElement("td");
          td1.classList.add("border", "px-4", "py-2");
          td1.textContent = todo.id;

          const td2 = document.createElement("td");
          td2.classList.add("border", "px-4", "py-2");
          td2.textContent = todo.title;

          const td3 = document.createElement("td");
          td3.classList.add("border", "px-4", "py-2");
          td3.textContent = todo.completed ? "Sí" : "No";

          const td4 = document.createElement("td");
          td4.classList.add("border", "px-4", "py-2");
          td4.textContent = todo.owner;

          const td5 = document.createElement("td");
          td5.classList.add("border", "px-4", "py-2");

          // Botón para Editar la tarea
          const btnEdit = document.createElement("button");
          btnEdit.classList.add("bg-blue-400", "text-white", "p-1", "rounded", "mr-2", "hover:bg-blue-600");
          btnEdit.textContent = "Editar";
          btnEdit.addEventListener("click", () => {
            const newTitle = prompt("Nuevo título:", todo.title);
            const newCompleted = confirm("¿Está completado?");

            // Actualizar tarea
            btnEdit.addEventListener("click", () => {
              const newTitle = prompt("Nuevo título:", todo.title);
              const newCompleted = confirm("¿Está completado?");
            
              fetch(`http://localhost:4000/todos/update/${todo.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  title: newTitle,
                  completed: newCompleted,
                }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                  }
                  return response.json();
                })
                .then((updatedTodo) => {
                  td2.textContent = updatedTodo.todo.title;
                  td3.textContent = updatedTodo.todo.completed ? "Sí" : "No";
                })
                .catch((error) => {
                  console.error("Error al actualizar:", error);
                });
            });
            
          });

          // Botón para Eliminar la tarea
          const btnDelete = document.createElement("button");
          btnDelete.classList.add("bg-blue-500", "text-white", "p-1", "rounded", "hover:bg-red-600");
          btnDelete.textContent = "Eliminar";
          btnDelete.addEventListener("click", () => {
            if (confirm("¿Estás seguro de eliminar esta tarea?")) {
              fetch(`http://localhost:4000/todos/delete/${todo.id}`, {
                method: "DELETE",
                credentials: "include",
          
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error en la solicitud: " + response.statusText);
                  }
                  return response.json();
                })
                .then(() => {
                  tr.remove();
                })
                .catch((error) => {
                  console.error("Error al eliminar:", error);
                });
            }
          });

          td5.appendChild(btnEdit);
          td5.appendChild(btnDelete);

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tbody.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Error al cargar los todos: " + error.message;
        errorMessage.classList.add("text-red-500");
        container.appendChild(errorMessage);
      });
  };

  // Cargar todos los todos al iniciar
  loadTodos();

  return container;
};
