// querySelector selected only the first button with this id

// const boton = document.querySelector('#boton-importante')
// console.log(boton)
// 
// if( boton != null) {
//     boton.addEventListener("click" , () => {
//         boton.textContent = 'applied'
//         boton.classList.add('is-applied')
//         boton.disabled = true
//     })
// }


// const botones = document.querySelectorAll('.button-apply-job')
// // devuelve un NodeList (array-like) con todos los botones que encuentra
// // o una lista vacia [] si no encuentra ninguno
// 
// botones.forEach(boton => {
//     boton.addEventListener("click", () => {
//         boton.textContent = "applied"
//         boton.classList.add('is-applied')
//         boton.disabled = true
//     } )
// })


const jobsListingSection = document.querySelector('.jobs-listings')

jobsListingSection.addEventListener('click', function(event) {
    console.log('click')
    const element = event.target

    if(element.classList.contains('button-apply-job')) {
        element.textContent = 'Applied'
        element.classList.add('is-applied')
        element.disabled = true
    }
    
})