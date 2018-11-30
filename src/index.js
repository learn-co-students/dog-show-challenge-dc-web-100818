
document.addEventListener('DOMContentLoaded', () => {
  getDogs();
  const dogForm = document.querySelector('form');
  dogForm.addEventListener('submit', function(e) {
    updateDog(e);
  })
})

///////////////////// Render Dogs To Page ////////////////////////////

function getDogs() {
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => data.forEach(dog => renderDogToDOM(dog)))
}

function renderDogToDOM (dog) {
  const tableArea = document.querySelector('#table-body');

  let trElement = document.createElement('tr')
  trElement.id = `dog-${dog.id}`
  let tdNameElement = document.createElement('td')
  tdNameElement.innerText = `${dog.name}`
  let tdBreedElement = document.createElement('td')
  tdBreedElement.innerText = `${dog.breed}`
  let tdGenderElement = document.createElement('td')
  tdGenderElement.innerText = `${dog.sex}`
  let editBtn = document.createElement('button');
  editBtn.innerText = ` Edit Dog `
  editBtn.id = `dog-${dog.id}`

  editBtn.addEventListener('click', function(e) {
    getDogForForm(e, dog)
  })

  tableArea.appendChild(trElement)
  trElement.append(tdNameElement, tdBreedElement, tdGenderElement, editBtn)
}

//////////////////// Populate Edit Table with Dog ////////////////////////

function getDogForForm(e, dog) {

  let nameInput = document.querySelector('#name');
  let breedInput = document.querySelector('#breed');
  let genderInput = document.querySelector('#sex');

  nameInput.value = `${dog.name}`
  nameInput.classList.add(`dog-${dog.id}`)
  breedInput.value = `${dog.breed}`
  genderInput.value = `${dog.sex}`

}

/////////////////////// Patch/Update Dog Data ///////////////////////////


function updateDog(e) {
  e.preventDefault()
  let dogId = e.currentTarget.children[0].classList[0].split('-')[1]

  let updateName = document.querySelector('#name').value;
  let updateBreed = document.querySelector('#breed').value;
  let updateGender = document.querySelector('#sex').value;

  let data = {
    name: updateName,
    breed: updateBreed,
    sex: updateGender
  }

  let parent = document.getElementById(`dog-${dogId}`)
  parent.children[0].innerText = updateName;
  parent.children[1].innerText = updateBreed;
  parent.children[2].innerText = updateGender;

  document.querySelector('form').reset()

  patchFetch(dogId, data)
}


function patchFetch(dogId, data) {
  fetch (`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => console.log(data))
}
