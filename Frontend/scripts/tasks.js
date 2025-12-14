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
                <strong> Completa: ${task.completed}</strong> <br>
                

                <div class="task-actions">
                <button class="button-task" onclick="editTask(${task.id})">Editar</button>
                <button class="button-task" onclick="deleteTask(${task.id})">Excluir</button>
                </div>
                
            `;

    list_tasks.appendChild(li);
  });
}

// Carregar a lista de tarefas ao carregar a página
load_tasks();
