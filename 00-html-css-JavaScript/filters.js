const filter = document.querySelector('#filter-location')
const message = document.querySelector('#filter-selected-value')
// const jobs = document.querySelectorAll('.job-listing-card') 


filter.addEventListener('change', () => {
    const jobs = document.querySelectorAll('.job-listing-card') 
    const selectedValue = filter.value
    // console.log(selectedValue)
    console.log(`Modalidad: ${selectedValue}`)

    if (selectedValue) {
        message.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mensaje.textContent = ''
    }

    jobs.forEach(job => {
        // const jobLocation = job.dataset.location 
        const jobLocation = job.getAttribute('data-modalidad')
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