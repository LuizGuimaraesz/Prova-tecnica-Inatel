API_URL = "http://127.0.0.1:5000";

async function load_users() {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();

  const list_users = document.getElementById("user-list");
  list_users.innerHTML = "";

  console.log(data);

  data.forEach((user) => {
    const li = document.createElement("li");

    li.innerHTML = `<p> Nome: ${user.username}</p>
                    <p> Email: ${user.email}</p><br>

    <button onclick="">Ver tarefas</button>
    <button onclick="">Editar</button>
    <button onclick="">Excluir</button>`;

    list_users.appendChild(li);
  });
}

async function update_user() {}

load_users();
