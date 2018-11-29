document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs();
  getDogEditForm().addEventListener('submit', editDog);
})

allDogs = [];

function fetchAllDogs(){
  fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(data => {
      data.forEach(function(dog){
        renderDog(dog);
        allDogs.push(dog);
      })
    })
}

function renderDog(dog){
  dogRow = document.createElement('tr');
  dogRow.id = `dog-${dog.id}`;
  getDogTable().appendChild(dogRow);
  //dog names
  dogNameCell = document.createElement('td');
  dogNameCell.id = 'name-cell';
  dogNameCell.innerText = `${dog.name}`;
  dogRow.appendChild(dogNameCell);
  //dog breeds
  dogBreedCell = document.createElement('td');
  dogBreedCell.id = 'breed-cell';
  dogBreedCell.innerText = `${dog.breed}`;
  dogRow.appendChild(dogBreedCell);
  //dog sex
  dogSexCell = document.createElement('td');
  dogSexCell.id = 'sex-cell';
  dogSexCell.innerText = `${dog.sex}`;
  dogRow.appendChild(dogSexCell);
  //dog edit buttons
  dogEditButtonCell = document.createElement('td');
  dogEditButtonCell.id = 'edit-cell';
  dogRow.appendChild(dogEditButtonCell);
  dogEditButton = document.createElement('button');
  dogEditButton.id = dog.id
  dogEditButton.innerText = 'Edit'
  dogEditButtonCell.appendChild(dogEditButton);
  //add event listener to dog edit button
  dogEditButton.addEventListener('click', showDogInForm);
}

function showDogInForm(event){
  thisDog = allDogs.find(dog => dog.id === Number(event.currentTarget.id));
  dogNameInputField = getAllInputFields()[0];
  dogNameInputField.placeholder = `${thisDog.name}`;
  dogBreedInputField = getAllInputFields()[1];
  dogBreedInputField.placeholder = `${thisDog.breed}`;
  dogSexInputField = getAllInputFields()[2];
  dogSexInputField.placeholder = `${thisDog.sex}`;
}

//functions to grab HTML elements
function getDogTable(){
  return document.querySelector('table');
}

function getDogEditForm(){
  return document.querySelector('form');
}

function getAllInputFields(){
  return document.querySelectorAll('input');
}

function getSubmitButton(){
  return getAllInputFields()[3];
}

//Editing Functions...
function editDog(event){
  event.preventDefault();
  dogToEdit = getAllInputFields()[0].placeholder;
  thisDog = allDogs.find(dog => dog.name === dogToEdit);
  if (getAllInputFields()[0].value !== ""){
    thisDog.name = getAllInputFields()[0].value
  }
  if (getAllInputFields()[1].value !== ""){
    thisDog.breed = getAllInputFields()[1].value
  }
  if (getAllInputFields()[2].value !== ""){
    thisDog.sex = getAllInputFields()[2].value
  }
  editInDOM(thisDog);
  patchDog(thisDog);
}

function editInDOM(thisDog){
  thisDogDiv = document.querySelector(`#dog-${thisDog.id}`)
  thisDogDiv.querySelectorAll('td')[0].innerText = thisDog.name;
  thisDogDiv.querySelectorAll('td')[1].innerText = thisDog.breed;
  thisDogDiv.querySelectorAll('td')[2].innerText = thisDog.sex;
}

function patchDog(thisDog){
  fetch(`http://localhost:3000/dogs/${Number(thisDog.id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(thisDog)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}
