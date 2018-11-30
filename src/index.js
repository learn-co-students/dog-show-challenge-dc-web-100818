const URL = 'http://localhost:3000/dogs/'
let updateId

document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
  getForm().addEventListener('submit', getFormValues)
})

function getAllDogs() {
  fetch(URL).then(res => res.json()).then(dogsData => {
    dogsData.forEach(dog => addDogToTable(dog))
  })
}

function getTBody() {
  return document.querySelector('#table-body')
}

function addDogToTable(dog) {
  let rowEl = document.createElement('tr')

  let nameCell = document.createElement('td')
  nameCell.innerText = dog.name

  let breedCell = document.createElement('td')
  breedCell.innerText = dog.breed

  let sexCell = document.createElement('td')
  sexCell.innerText = dog.sex

  let editCell = document.createElement('td')
  let editBtn = document.createElement('button')
  editBtn.innerText = 'Edit Dog'
  editBtn.dataset.dogId = dog.id
  editBtn.addEventListener('click', populateForm)

  editCell.appendChild(editBtn)
  rowEl.append(nameCell, breedCell, sexCell, editCell)
  getTBody().appendChild(rowEl)
}

function patchDog(id, dogData) {
  fetch(URL + `${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(dogData)
  }).then(res => res.json()).then(dog => updateDogOnTable(dog))
}

function getForm() {
  return document.querySelector('#dog-form')
}

function populateForm(event) {
  let dogInfo = event.target.parentNode.parentNode.children
  let inputs = getForm().children
  inputs[0].value = dogInfo[0].innerText
  inputs[1].value = dogInfo[1].innerText
  inputs[2].value = dogInfo[2].innerText
  inputs[3].dataset.dogId = event.target.dataset.dogId
}

function getFormValues() {
  event.preventDefault()
  let values = getForm().children
  let dogId = values[3].dataset.dogId
  values[3].removeAttribute('data-dog-id')
  patchDog(dogId, {id: dogId, name: values[0].value, breed: values[1].value, sex: values[2].value})
  getForm().reset

}

function updateDogOnTable(dog) {
  let dogInfo = document.querySelector(`[data-dog-id='${dog.id}']`)
    .parentNode.parentNode.children

  dogInfo[0].innerText = dog.name
  dogInfo[1].innerText = dog.breed
  dogInfo[2].innerText = dog.sex
}
