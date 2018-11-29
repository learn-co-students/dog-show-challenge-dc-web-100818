document.addEventListener('DOMContentLoaded', () => {
  fetchAPI()

  editForm().addEventListener("submit", editSubmit)
})

const tableBody = () => document.querySelector("#table-body")
const editForm = () => document.querySelector("#dog-form")



// GET FETCH API
function fetchAPI() {
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => {
      data.forEach(dog => render(dog))
    })
}

// PATCH FETCH API
function patchAPI(data) {

  fetch(`http://localhost:3000/dogs/${data.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(() => {
      destroyChildren(tableBody())
      fetchAPI()
    })
}

// EDIT FORM SUBMISSION
function editSubmit(event) {
  event.preventDefault()

  let dataObject = {
    id: editForm().children[0].id,
    name: editForm().children[0].value,
    breed: editForm().children[1].value,
    sex: editForm().children[2].value
  }

  patchAPI(dataObject)
}

// RENDER DOGS
function render(data) {
  let tr = document.createElement("tr")
  tr.innerHTML = `<td>${data.name}</td> <td>${data.breed}</td> <td>${data.sex}</td>`
  tr.id = data.id

  let td = document.createElement("td")
  let button = document.createElement("button")
  button.innerText = "Edit"
  button.addEventListener("click", populateEditForm)
  td.appendChild(button)
  tr.appendChild(td)

  tableBody().appendChild(tr)

}

// EDIT BUTTON FUNCTIONALITY
function populateEditForm(event) {
  const rowData = event.target.parentElement.parentElement

  editForm().children[0].id = rowData.id
  editForm().children[0].value = rowData.children[0].innerText

  editForm().children[1].id = rowData.id
  editForm().children[1].value = rowData.children[1].innerText

  editForm().children[2].id = rowData.id
  editForm().children[2].value = rowData.children[2].innerText
}

// REMOVE ALL CHILDREN
function destroyChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}
