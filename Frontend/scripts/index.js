const API_URL = "http://127.0.0.1:5000";

// Evento de envio do formulário de criação de usuário
document
  .getElementById("create-user-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("create-nome").value;
    const email = document.getElementById("create-email").value;

    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    if (response.status === 201) {
      close_tela("modal-create");
      clean_form();
      load_users();
      alert("Usuário criado com sucesso!");
    } else {
      alert("Erro ao criar usuário.");
    }
  });

// Função para carregar e exibir a lista de usuários
async function load_users() {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();

  const list_users = document.getElementById("user-list");
  list_users.innerHTML = "";

  data.forEach((user) => {
    const li = document.createElement("li");

    li.innerHTML = `<p><strong> Nome: </strong>${user.username}</p>
                    <p><strong> Email: </strong> ${user.email}</p><br>

                    <div class="user-actions">
                    <button class="button-user" onclick="viewTasks(${user.id})">Ver tarefas</button>

                    <button class="button-user" 
                    onclick='open_edit_tela({ id: "${user.id}", username: "${user.username}", email: "${user.email}" })'>
                    Editar
                    </button>

                      <button class="button-danger" onclick="deleteUser(${user.id})">Excluir</button>
                     `;

    list_users.appendChild(li);
  });
}

// Evento de envio do formulário de edição de usuário
document
  .getElementById("update-user-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("edit-user-id").value;

    const username = document.getElementById("edit-nome").value;
    const email = document.getElementById("edit-email").value;

    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    if (response.status === 200) {
      load_users();
      close_tela("modal-edit");
      alert("Usuário atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar usuário.");
    }
  });

// Função para deletar um usuário
async function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      load_users();
      alert("Usuário excluído com sucesso!");
    } else {
      alert("Erro ao excluir usuário.");
    }
  }
}

// Funções para abrir modal de edição de usuário
function open_edit_tela(user) {
  const modalId = "modal-edit";
  const tela = document.getElementById(modalId);
  const main = document.getElementsByTagName("main")[0];

  document.getElementById("edit-user-id").value = user.id;
  document.getElementById("edit-nome").value = user.username;
  document.getElementById("edit-email").value = user.email;

  tela.classList.remove("hidden");

  document.body.classList.add("blur-fundo");
  main.classList.add("disabled_scroll");

  document.body.style.overflow = "hidden";
}

function clean_form() {
  document.getElementById("create-nome").value = "";
  document.getElementById("create-email").value = "";
}

// Função para ver tarefas de um usuário
function viewTasks(userId) {
  window.location.href = `tasks.html?user_id=${userId}`;
}

// Mostrar a lista de usuários ao carregar a página
load_users();
