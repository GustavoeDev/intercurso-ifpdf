function setTotalInputs() {
  const totalInputs = document.querySelector("#total-inputs").innerHTML

  for (let i=0; i < (totalInputs-1); i++) {
    addNewInput()
  }
}

function addNewInput() {
  const row = document.createElement("div");
  row.className = "member-inputs";

  const inputContainer1 = document.createElement("div");
  inputContainer1.className = "input-container";

  const input1 = document.createElement("input");
  input1.required = false;
  input1.className = "input";
  input1.type = "text";
  input1.id = "member-name";
  input1.placeholder = "Nome completo";

  inputContainer1.appendChild(input1);

  const inputContainer2 = document.createElement("div");
  inputContainer2.className = "input-container";

  const input2 = document.createElement("input");
  input2.required = false;
  input2.className = "input";
  input2.type = "text";
  input2.id = "registration-number";
  input2.placeholder = "Matricula";

  inputContainer2.appendChild(input2);

  const inputContainer3 = document.createElement("div");
  inputContainer3.className = "input-container";


  const selectContainer = document.createElement("div");
  selectContainer.className = "select-container";

  const select = document.createElement("select");
  select.required = false;
  select.name = "course";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  defaultOption.textContent = "Curso";
  select.appendChild(defaultOption);

  const courses = [
    { value: "ads", text: "ADS" },
    { value: "agro-industria", text: "Agroindústria" },
    { value: "alimentos", text: "Alimentos" },
    { value: "apicultura", text: "Apicultura" },
    { value: "informatica", text: "Informática" },
    { value: "quimica", text: "Química" }
  ];

  courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.value;
    option.textContent = course.text;
    select.appendChild(option);
  });

  selectContainer.appendChild(select);
  inputContainer3.appendChild(selectContainer);

  row.appendChild(inputContainer1);
  row.appendChild(inputContainer2);
  row.appendChild(inputContainer3);

  const container = document.querySelector('#members-input-container')

  container.appendChild(row)
  
}

const addInputButton = document.querySelector('#add-new-member')

addInputButton.addEventListener('click', () => {
  let totalInputsValue = parseInt(document.querySelector("#total-inputs").innerHTML)
  let totalInputs = document.querySelector("#total-inputs")
  const maxMemberValue = parseInt(document.querySelector("#max-inputs").innerHTML)

  if (totalInputsValue >= maxMemberValue) {
    window.alert('O número maximo de membros já foi atingido')
    addInputButton.disabled = true; 
    addInputButton.style.display = "none"
  } else {
    totalInputs.textContent = parseInt(totalInputsValue) + 1
    addNewInput()
  }
})
window.addEventListener("load", setTotalInputs);