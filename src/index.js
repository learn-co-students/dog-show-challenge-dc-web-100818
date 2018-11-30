document.addEventListener('DOMContentLoaded', () => {
  
  const dogForm = document.getElementById('dog-form');
  
  fetchAllDogs()
  
  tableDiv().addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) {
      // current tr
      let tr = e.target.parentElement.parentElement;

      // DOM ELEMENTS
      const nameInput = document.getElementById('name');
      const breedInput = document.getElementById('breed');
      const sexInput = document.getElementById('sex')
    
      // break down tr inner childrens
      const dogId = tr.id.split('-')[1]
      const dogNameInput = tr.children[0];
      const dogBreedInput = tr.children[1];
      const dogSexInput = tr.children[2]
      
      // set form inputs with tr inner childrens values
      nameInput.value = dogNameInput.innerText
      breedInput.value = dogBreedInput.innerText
      sexInput.value = dogSexInput.innerText

      // dogForm event listeners
      dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        updateDog(dogId, nameInput, breedInput, sexInput);
      })
    
    }
  })
});

function updateDog(dogId, nameInput, breedInput, sexInput) {
  let data = {
    name: nameInput.value,
    breed: breedInput.value,
    sex: sexInput.value
  }
  fetch(` http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      let newUpdatedDog = new Dog(data.id, data.name, data.breed, data.sex)
      newUpdatedDog.updateDog();
    })
}

function tableDiv() {
  return document.getElementById('table-body');
}

class Dog {
  constructor(id, name, breed, sex) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
  }

  renderDog() {
    tableDiv().innerHTML += `
      <tr id="dog-${this.id}">
        <td class="name-${this.id}">${this.name}</td>
        <td class="breed-${this.id}">${this.breed}</td>
        <td class="sex-${this.id}">${this.sex}</td>
        <td><button class="edit">Edit</button></td>
      </tr>
    `
  }

  updateDog() {
    let newName = document.querySelector(`.name-${this.id}`);
    let newBreed = document.querySelector(`.breed-${this.id}`);
    let newSex = document.querySelector(`.sex-${this.id}`);

    newName.innerText = this.name
    newBreed.innerText = this.breed
    newSex.innerText = this.sex
    
  }
}

function fetchAllDogs() {
  fetch(`http://localhost:3000/dogs`)
    .then(response => response.json())
    .then(data => {
      data.forEach(dog => {
        let newDog = new Dog(dog.id, dog.name, dog.breed, dog.sex)
        newDog.renderDog()
      })
    });
}

