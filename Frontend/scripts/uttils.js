function close_tela(modalId) {
  const tela = document.getElementById(modalId);
  const main = document.getElementsByTagName("main")[0];

  tela.classList.add("hidden");

  document.body.classList.remove("blur-fundo");
  main.classList.remove("disabled_scroll");

  document.body.style.overflow = "auto";
}

function open_create_tela(modalId) {
  const tela = document.getElementById(modalId);
  const main = document.getElementsByTagName("main")[0];

  tela.classList.remove("hidden");

  document.body.classList.add("blur-fundo");
  main.classList.add("disabled_scroll");

  document.body.style.overflow = "hidden";
}
