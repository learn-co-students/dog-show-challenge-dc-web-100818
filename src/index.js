document.addEventListener('DOMContentLoaded', () => {
  getFetch()

  submitForm().addEventListener('submit', patchFetch)
  // debugger;
})

function getFetch() {
  fetch('http://localhost:3000/dogs')
  .then( res => res.json())
  .then( data => data.forEach(render) )
}

function render(dog){

  let tbody = document.getElementById('table-body')

  let tr = document.createElement('tr')
  let tdName = document.createElement('td')
  let tdBreed = document.createElement('td')
  let tdSex = document.createElement('td')
  let tdEdit = document.createElement('td')
  let editButton = document.createElement('button')

  tdName.innerText = dog.name
  tdBreed.innerText = dog.breed
  tdSex.innerText = dog.sex
  editButton.innerText = "Edit Dog"
  editButton.dataset.id = dog.id
  tr.dataset.id = dog.id

  editButton.addEventListener('click', (event)=>{
    let row = event.target.parentElement.parentElement
    let nameValue = row.children[0].innerText
    let breedValue = row.children[1].innerText
    let sexValue = row.children[2].innerText


    let input = document.querySelectorAll('input')
    input[0].value = nameValue
    input[1].value = breedValue
    input[2].value = sexValue
    submitForm().dataset.id = dog.id


  })

  tbody.appendChild(tr)
  tr.append(tdName,tdBreed,tdSex,tdEdit)
  tdEdit.appendChild(editButton)
}


function submitForm(){
  return form = document.getElementById('dog-form')
}




function patchFetch(event) {
  event.preventDefault()
  // debugger
  let nameInput = document.querySelector('input[name="name"]').value
  let breedInput = document.querySelector('input[name="breed"]').value
  let sexInput = document.querySelector('input[name="sex"]').value
  let currentId = event.target.dataset.id


  let row = document.querySelector(`tr[data-id = "${currentId}"]`)


  let data = {
    name: nameInput,
    breed: breedInput,
    sex: sexInput
  }

  row.children[0].innerText = nameInput
  row.children[1].innerText = breedInput
  row.children[2].innerText = sexInput


  fetch(`http://localhost:3000/dogs/${currentId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:  JSON.stringify(data)
  })
  // .then( res => res.json())
  // .then( data => render(data) )

  submitForm().reset()
}
