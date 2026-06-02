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

const botones = document.querySelectorAll('.button-apply-job')
// devuelve un NodeList (array-like) con todos los botones que encuentra
// o una lista vacia [] si no encuentra ninguno

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        boton.textContent = "applied"
        boton.classList.add('is-applied')
        boton.disabled = true
    } )
})
