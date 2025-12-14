API_URL = "http://127.0.0.1:5000";

// Obter o ID do usuário selecionado a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const selected_id = urlParams.get("user_id");

// Função para carregar e exibir a lista de tarefas do usuário selecionado
async function load_tasks() {
  if (!selected_id) {
    alert("Nenhum usuário selecionado.");
    return;
  }
  const response = await fetch(`${API_URL}/tasks/${selected_id}`);
  const data = await response.json();
  const list_tasks = document.getElementById("task-list");
  list_tasks.innerHTML = "";
  console.log(data);
  data.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
                <strong> Tarefa: ${task.title}</strong>
                <strong> Descrição: ${task.description}</strong>
                <strong> Status: ${task.completed ? "✅" : "❌"}</strong><br>
                
                

                <div class="task-actions">
                
                <button class="button-task" onclick='open_edit_task({ 
                  id: "${task.id}", 
                  title: "${task.title.replace(/"/g, "&quot;")}", 
                  description: "${task.description.replace(/"/g, "&quot;")}",
                  completed: ${task.completed} })'
                  >Editar</button>
                  
                  
                  <button class="button-task" onclick="deleteTask(${
                    task.id
                  })">Excluir</button>
                </div>  `;

    list_tasks.appendChild(li);
  });
}

document
  .getElementById("create-task-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("create-title").value;
    const description = document.getElementById("create-description").value;

    const response = await fetch(`${API_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, user_id: selected_id }),
    });

    if (response.status === 201) {
      alert("Tarefa criada com sucesso!");
      close_tela("modal-create-task");
      load_tasks();
    } else {
      alert("Erro ao criar tarefa.");
    }
  });

function open_create_tela() {
  const tela = document.getElementById("modal-create-task");
  const main = document.getElementsByTagName("main")[0];

  tela.classList.remove("hidden");

  document.body.classList.add("blur-fundo");
  main.classList.add("disabled_scroll");

  document.body.style.overflow = "hidden";
}

function clean_task_form() {
  document.getElementById("create-title").value = "";
  document.getElementById("create-description").value = "";
}

// Função para editar uma tarefa
document
  .getElementById("update-task-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("edit-task-id").value;

    const title = document.getElementById("edit-title").value;
    const description = document.getElementById("edit-description").value;
    const completed = document.getElementById("edit-completed").checked;

    const response = await fetch(`${API_URL}/task/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, completed }),
    });

    if (response.status === 200) {
      load_tasks();
      close_tela("modal-edit-task");
      alert("Tarefa atualizada com sucesso!");
    } else {
      alert("Erro ao atualizar tarefa.");
    }
  });

// Função para deletar uma tarefa
async function deleteTask(id) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    const response = await fetch(`${API_URL}/task/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      load_tasks();
      alert("Tarefa excluída com sucesso!");
    } else {
      alert("Erro ao excluir tarefa.");
    }
  }
}

function open_edit_task(task) {
  const modalId = "modal-edit-task";
  const tela = document.getElementById(modalId);
  const main = document.getElementsByTagName("main")[0];

  document.getElementById("edit-task-id").value = task.id;

  document.getElementById("edit-title").value = task.title;
  document.getElementById("edit-description").value = task.description;

  tela.classList.remove("hidden");

  document.body.classList.add("blur-fundo");
  main.classList.add("disabled_scroll");

  document.body.style.overflow = "hidden";
}

// Carregar a lista de tarefas ao carregar a página
load_tasks();
