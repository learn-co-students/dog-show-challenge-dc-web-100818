document.addEventListener('DOMContentLoaded', () => {
  listRegisteredDogs()
})

//fetches all dogs
function getDogs () {
  return fetch ('http://localhost:3000/dogs')
  .then(res => res.json())
}

// fetches all the existing dogs in the database
function listRegisteredDogs(){
  // fetch ('http://localhost:3000/dogs')
  // .then(res => res.json())
  getDogs().then(data => data.forEach(dog => renderDogRow(dog)))
}

// builds and fills a dog row
function renderDogRow(dog){
  let name = dog.name;
  let breed = dog.breed;
  let sex = dog.sex;
  let id = dog.id;

  let newRow = document.createElement('tr');
    let nameData = document.createElement('td');
      nameData.innerText = name;
    let breedData = document.createElement('td');
      breedData.innerText = breed;
    let sexData = document.createElement('td');
      sexData.innerText = sex;
    let editButton = document.createElement('button');
      editButton.dataset.id = id;
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', editDog)

  document.querySelector('#table-body').append(newRow);
  newRow.append( nameData, breedData, sexData, editButton);
}

// when the edit button is clicked it fills the form with the dog data to edit
function editDog (event) {
  let dogId = parseInt(event.target.dataset.id); //grabs the dg's id from the dataset
  getDogs(dogId).then(data => { //fetch request was made for all the dogs
    let dog = data.find( dog => {return dog.id === dogId}) //returns the dog based on ID
    let name = dog.name;
    let breed = dog.breed;
    let sex = dog.sex;
    fillEditForm(name, breed, sex, dogId); //fills the dog forms with the dog values
  })
}



function fillEditForm(name, breed, sex, dogId) {
  document.getElementsByName('name')[0].value = name;
  document.getElementsByName('breed')[0].value = breed;
  document.getElementsByName('sex')[0].value = sex;
  document.getElementById('dog-form').dataset.id = dogId;
  document.getElementById('dog-form').addEventListener('submit', patchRequest)
}

function patchRequest(event) {
  event.preventDefault()
  let dogId = event.target.dataset.id
  let data = {
    name: event.target.querySelectorAll('input')[0].value,
    breed: event.target.querySelectorAll('input')[1].value,
    sex: event.target.querySelectorAll('input')[2].value
  }
  fetch (`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then (response => response.json())
  .then (() => {
    let tableBody = document.querySelector('#table-body');
    while (tableBody.hasChildNodes()) {
      tableBody.removeChild(tableBody.lastChild);
    }
    listRegisteredDogs()
    document.getElementById('dog-form').dataset.id = "" ;
    document.getElementById('dog-form').reset()
  }
  )
}
//when the event button is clicked, I want to...
 // populate the dogs info into the form so it can be edited
 // once the submit button is clicked,
 //    a patchfetch request is made that will update the dom and the db
