document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  getDogForm().addEventListener('submit', patchDogs)
})

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
    .then(resource => resource.json())
    .then(data => {
      data.forEach(dog => renderDogTable(dog))}
  )
}

function patchDogs(event) {
  event.preventDefault();
  let data = {
   name: event.target.children[0].value,
   breed: event.target.children[1].value,
   sex: event.target.children[2].value
 }
  fetch(`http://localhost:3000/dogs/${event.target.id}`, {
    method: "PATCH",
    headers: {
   "Content-Type": "application/json"
   },
   body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    let dogRow = document.querySelector(`#dog-${data.id}`)
    dogRow.children[0].innerText = data.name
    dogRow.children[1].innerText = data.breed
    dogRow.children[2].innerText = data.sex
  })
}

function renderDogTable(dog) {
  const dogRow = document.createElement('tr')
  dogRow.id = `dog-${dog.id}`

  let nameCell = document.createElement('td')
  nameCell.className = 'dog-name'
  nameCell.innerText = dog.name

  let breedCell = document.createElement('td')
  breedCell.className = 'dog-breed'
  breedCell.innerText = dog.breed

  let sexCell = document.createElement('td')
  sexCell.className = 'dog-sex'
  sexCell.innerText = dog.sex

  let editCell = document.createElement('td')
  editCell.className = 'dog-edit'
  editCell.innerText = 'Edit Dog'
  editCell.addEventListener('click', function () {
    getDogForm().children[0].value = dog.name
    getDogForm().children[1].value = dog.breed
    getDogForm().children[2].value = dog.sex
    getDogForm().id = dog.id
  })

  dogRow.appendChild(nameCell)
  dogRow.appendChild(breedCell)
  dogRow.appendChild(sexCell)
  dogRow.appendChild(editCell)
  getDogTable().appendChild(dogRow)
}

function getDogTable(){
  return document.querySelector('#table-body')
}

function getDogForm() {
  return document.querySelector('#dog-form')
}
