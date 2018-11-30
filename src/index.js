document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs()
  getForm().addEventListener("submit", function(e) {
    renderEditedDog(e)})
})
//
// function getSubmitBtn(){
//   document.querySelector(`#${id}`)
// }

function getForm(){
  return document.querySelector("form")
}

function fetchAllDogs(){
  fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(data => data.forEach(dog => renderAllDogs(dog))
)}

function renderAllDogs(dog){
  let tBody = document.querySelector("#table-body")

  let tRow = document.createElement("tr")
    tBody.appendChild(tRow)

  let tName = document.createElement("td")
    tName.id = `name-${dog.id}`
    tName.innerText = dog.name

  let tBreed = document.createElement("td")
    tBreed.id = `breed-${dog.id}`
    tBreed.innerText = dog.breed

  let tSex = document.createElement("td")
    tSex.id = `sex-${dog.id}`
    tSex.innerText = dog.sex

  let tEdit = document.createElement("td")
  let editBtn = document.createElement("button")
    //attach dogid to each edit button w/ setAttribute
    editBtn.id = `dog-${dog.id}`
    editBtn.addEventListener("click", function(){
      dogEditSelector(dog)
    })
  let editText = document.createTextNode("Edit Dog")

    editBtn.appendChild(editText)
    tEdit.appendChild(editBtn)


    tRow.append(tName, tBreed, tSex, tEdit)
}



function dogEditSelector(dog){
  document.getElementsByName("name")[0].value = dog.name
  document.getElementsByName("breed")[0].value = dog.breed
  document.getElementsByName("sex")[0].value = dog.sex

  document.getElementsByName("name")[0].id = dog.id
}


//when i hit submit, I watch to patch the info in the field
//and submit to the database


function renderEditedDog(e){
  e.preventDefault()
  let dogId = e.currentTarget.children[0].id

  let nameInput = document.getElementsByName("name")[0].value
  let breedInput = document.getElementsByName("breed")[0].value
  let sexInput = document.getElementsByName("sex")[0].value

  fetchPatch(dogId, nameInput, breedInput, sexInput)

}

function fetchPatch(id, nameInput, breedInput, sexInput){
  const patchData = {
    name: nameInput,
    breed: breedInput,
    sex: sexInput
  }

  let updateName = document.getElementById(`name-${id}`)
  let updateBreed = document.getElementById(`breed-${id}`)
  let updateSex = document.getElementById(`sex-${id}`)

  fetch(`http://localhost:3000/dogs/${id}`,  {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json"
          },
    body: JSON.stringify(patchData)
  })
  .then(res => res.json())
  .then(resData => {
    updateName.innerText = resData.name;
    updateBreed.innerText = resData.breed;
    updateSex.innerText = resData.sex;

})
}
