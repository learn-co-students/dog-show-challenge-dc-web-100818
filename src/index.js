fetchAllDogs()

// FETCH FUNCTION
function fetchAllDogs() {
  fetch('http://localhost:3000/dogs')
    .then (res => res.json())
    .then (data => {
      data.forEach(dog => {renderDog(dog)})
    } )
}

function patchDog(id, dog) {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers:
    {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(dog)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById(id).children[0].innerText = data.name
    document.getElementById(id).children[1].innerText = data.breed
    document.getElementById(id).children[2].innerText = data.sex
  })
}

// DATA MANIPULATION
function renderDog(dog) {
  let tr = document.createElement('tr')
  tr.id = dog.id

  let tdName = document.createElement('td')
  tdName.classList.add('name')
  tdName.innerText = dog.name

  let tdBreed = document.createElement('td')
  tdBreed.classList.add('breed')
  tdBreed.innerText = dog.breed

  let tdSex = document.createElement('td')
  tdSex.classList.add('sex')
  tdSex.innerText = dog.sex

  let tdBtn = document.createElement('td')
  let btn = document.createElement('button')
  btn.innerText = 'Edit'
  tdBtn.addEventListener('click', addToForm)

  document.querySelector('#table-body').appendChild(tr)
  tr.appendChild(tdName)
  tr.appendChild(tdBreed)
  tr.appendChild(tdSex)
  tr.appendChild(tdBtn)
  tdBtn.appendChild(btn)
}

function addToForm(e) {
  e.preventDefault()

  let name = e.currentTarget.parentElement.querySelector('.name').innerText
  let breed = e.currentTarget.parentElement.querySelector('.breed').innerText
  let sex = e.currentTarget.parentElement.querySelector('.sex').innerText
  let id = e.currentTarget.parentElement.id
  document.querySelector('#name').value = name
  document.querySelector('#breed').value = breed
  document.querySelector('#sex').value = sex

  document.querySelector('#dog-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let dog = {
      name: e.currentTarget.children[0].value,
      breed: e.currentTarget.children[1].value,
      sex: e.currentTarget.children[2].value
    }
    patchDog(id, dog)
  })
}
