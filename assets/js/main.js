import Barbecue from "./Barbecue.js";
import Validation from "./Validation.js";

const baseUrlApi = "http://localhost:3000/contacts";

const themeCheckbox = document.getElementById("theme");
let selectedTheme = localStorage.getItem("theme") ?? "light";

const pages = document.getElementsByClassName("page");
const formRegister = document.getElementById("form-register");
const btnCalculate = document.getElementById("calculate");
const btnNewCalc = document.getElementById("btn-new-calc");

const people = {
  men: 0,
  women: 0,
  children: 0,
  drink: 0,
};

let barbecueItems;

const mask = {
  cep: "00000-000",
};

const validateRegister = (data) => {
  let errorMessager = null;

  if (!Validation.isName(data.name, 5)) {
    errorMessager = "Nome Inválido";
  } else if (!Validation.isEmail(data.email)) {
    errorMessager = "E-mail Inválido";
  } else if (!Validation.isCep(data.cep)) {
    errorMessager = "CEP Inválido";
  }

  return errorMessager;
};

IMask(document.getElementById("cep"), mask.cep);

/**
 * adiciona e evento change ao botão de ativar e desativar o tema dark
 */
themeCheckbox.addEventListener("change", function () {
  if (themeCheckbox.checked) {
    selectedTheme = "dark";
  } else {
    selectedTheme = "light";
  }
  updateTheme();
});

/**
 * evento de submeter o formulário de cadastro de contatos
 */
formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formRegister);
  const dataObject = {};

  for (const key of formData.keys()) {
    const value = formData.get(key);
    dataObject[key] = value;
  }

  let errorValidation = validateRegister(dataObject);
  console.log(errorValidation)

  if (errorValidation === null) {
    const result = await registerContact(dataObject);

    if (result) {
      alert("cadastro realizado com sucesso.");
      localStorage.setItem("isRegister", true);
      activatePage("page-count-people");
    } else {
      alert("Erro ao cadastrar contato.");
    }
  }else{
    alert(errorValidation)
  }
});

/**
 * Adiciona o evento para os componente de adicionar e remover
 * pessoa que farão parte do churrasco
 */
document.querySelectorAll(".decrease, .increase").forEach((button) => {
  button.addEventListener("click", function () {
    const referenceId = this.getAttribute("reference-id");

    const element = document.getElementById(referenceId);

    let value = parseInt(element.textContent);

    if (this.classList.contains("increase")) {
      value++;
    } else {
      value = Math.max(0, value - 1);
    }

    people[referenceId] = value;

    element.textContent = value;
  });
});

btnCalculate.addEventListener("click", () => {
  const barbecue = new Barbecue(people);
  barbecueItems = barbecue.getAmountItems();

  document.getElementById("amount-men").innerText = people.men + " homem(ns)";
  document.getElementById("amount-women").innerText =
    people.women + " mulher(es)";
  document.getElementById("amount-children").innerText =
    people.children + " criança(s)";
  document.getElementById("amount-people").innerText =
    people.men + people.women + people.children + " convidados";

  Object.entries(barbecueItems).forEach(([key, value]) => {
    const cell = document.getElementById(key);
    cell.innerText = value;
  });

  activatePage("page-barbecue");
});

btnNewCalc.addEventListener("click", () => {
  activatePage("page-count-people");
});

/**
 * troca o tema da página de acordo com o valor da
 * variável selectedTheme
 */
function updateTheme() {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(selectedTheme);
  themeCheckbox.checked = selectedTheme === "dark";
  localStorage.setItem("theme", selectedTheme);
}

/**
 * Troca
 * @param {*} pageId
 */
function activatePage(pageId) {
  for (const page of pages) {
    page.classList.remove("d-flex");
    page.classList.add("d-none");
  }
  const currentPage = document.getElementById(pageId);
  currentPage.classList.remove("d-none");
  currentPage.classList.add("d-flex");
}

/**
 * Função assincrona para cadastrar os dados de contato do usuário
 * usando o json-server
 * @param {*} contact
 * @returns
 */
async function registerContact(contact) {
  try {
    const response = await fetch(baseUrlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Pagina não encontrada.");
    }

    return true;
  } catch (error) {
    return false;
  }
}

if (localStorage.getItem("isRegister") == "true") {
  activatePage("page-count-people");
} else {
  activatePage("page-register");
}

updateTheme();
