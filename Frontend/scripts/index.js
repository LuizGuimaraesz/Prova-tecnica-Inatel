API_URL = "http://127.0.0.1:5000";

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

  console.log(data);

  data.forEach((user) => {
    const li = document.createElement("li");

    li.innerHTML = `<strong> Nome: ${user.username}</strong>
 <strong> Email: ${user.email}</strong><br>

<div class="user-actions">
<button class="button-user" onclick="viewTasks(${user.id})">Ver tarefas</button>

<button 
class="button-user" 
onclick='open_edit_tela({ id: "${user.id}", username: "${user.username}", email: "${user.email}" })'
 >
Editar
 </button>

 <button class="button-user" onclick="deleteUser(${user.id})">Excluir</button>
                     </div>`;

    list_users.appendChild(li);
  });
}

// Evento de submissão do formulário de edição de usuário
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

// Funções para abrir e fechar os modais do usuário
function open_create_tela() {
  const tela = document.getElementById("modal-create");
  const main = document.getElementsByTagName("main")[0];

  tela.classList.remove("hidden");

  document.body.classList.add("blur-fundo");
  main.classList.add("disabled_scroll");

  document.body.style.overflow = "hidden";
}

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

function close_tela(modalId) {
  const tela = document.getElementById(modalId);
  const main = document.getElementsByTagName("main")[0];

  tela.classList.add("hidden");

  document.body.classList.remove("blur-fundo");
  main.classList.remove("disabled_scroll");

  document.body.style.overflow = "auto";
}

// Função para limpar o formulário de criação de usuário
function clean_form(meodalId) {
  document.getElementById("create-nome").value = "";
  document.getElementById("create-email").value = "";
}

// Função para ver tarefas de um usuário
function viewTasks(userId) {
  window.location.href = `tasks.html?user_id=${userId}`;
}

// Carregar a lista de usuários ao carregar a página
load_users();
