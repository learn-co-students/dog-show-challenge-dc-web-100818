document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  getEditForm().addEventListener('submit', postEdit)
})

function fetchDogs(){
  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(makeDog)
    })
}

function makeDog(dog){
  let dogRow = document.createElement('tr')
  dogRow.classList.add(`dog-${dog.id}`)
  let dogName = document.createElement('td')
  dogName.innerText = dog.name

  let dogBreed = document.createElement('td')
  dogBreed.innerText = dog.breed

  let dogSex = document.createElement('td')
  dogSex.innerText = dog.sex

  let dogBtn = document.createElement('td')
  dogBtn.innerHTML = "<button>Edit</button>"
  dogBtn.addEventListener('click', function(){
    getEditForm().children[0].value = dog.name
    getEditForm().children[1].value = dog.breed
    getEditForm().children[2].value = dog.sex
    getEditForm().dataset.id = dog.id
  })

  dogRow.appendChild(dogName)
  dogRow.appendChild(dogBreed)
  dogRow.appendChild(dogSex)
  dogRow.appendChild(dogBtn)
  getDogTable().appendChild(dogRow)
}

function getDogTable(){
  return document.querySelector('#table-body')
}

function getEditForm(){
  return document.querySelector('#dog-form')
}

function postEdit(event){
  event.preventDefault()
  let data = {
    name: event.target.children[0].value,
    breed: event.target.children[1].value,
    sex: event.target.children[2].value
  }
  fetch(`http://localhost:3000/dogs/${event.target.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(json => {
      let row = document.querySelector(`.dog-${json.id}`)
      row.children[0].innerText = json.name
      row.children[1].innerText = json.breed
      row.children[2].innerText = json.sex
    })
}
