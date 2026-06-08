// // Others ways to Add event to a element
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



// // More event examples
// const searchInput = document.querySelector('#empleos-search-input')
// 
// searchInput.addEventListener('input', () => {
//     // console.log(searchInput.value)
//     })
// 
// const searchForm = document.getElementById('empleos-search-form')
// searchForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     console.log('submit')
// })
// 
// 
// document.addEventListener('keydown', (event) => {
//     // console.log('key pressed: ' + event.key)
//     // console.log("key pressed shift? " + event.shiftKey)
//     // console.log("key pressed ctrl? " + event.ctrlKey)
//     // console.log('key pressed alt? ' + event.altKey)
// })


const jobsListingSection = document.querySelector('.jobs-listings')

// jobsListingSection.addEventListener('click', function(event) {
//     // console.log('click')
//     const element = event.target

// "Optional Chaining" '?' prevent console errors if element doesn't exist 
jobsListingSection?.addEventListener('click', function(event) {
    // console.log('click')
    const element = event.target

    if(element.classList.contains('button-apply-job')) {
        element.textContent = 'Applied'
        element.classList.add('is-applied')
        element.disabled = true
    }
    
})

const filter = document.querySelector('#filter-location')
const message = document.querySelector('#filter-selected-value')
const jobs = document.querySelectorAll('.job-listing-card')

filter.addEventListener('change', () => {
    const selectedValue = filter.value
    console.log(selectedValue)

    if (selectedValue) {
        message.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mensaje.textContent = ''
    }

    jobs.forEach(job => {
        // const jobLocation = job.dataset.location
        const jobLocation = job.getAttribute('data-location')
        const isShown = selectedValue === '' || selectedValue === jobLocation

        job.classList.toggle('is-hidden', !isShown)


        // // using if statement works fine but using .toggle() improve our code 
        // if (selectedValue === '' || selectedValue === jobLocation) {
        //     // job.style.display = 'flex' // it's recommended to do not apply style directly to the element.  
        //     job.classList.remove('is-hidden')
        // } else {
        //     // job.style.display = 'none'
        //     job/classList.add('is-hidden')
        // }
    })
})

    