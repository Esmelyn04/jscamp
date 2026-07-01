import { useState, useEffect } from 'react'
import "../index.css"
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'
import { Pagination } from '../components/Pagination.jsx' 

const RESULTS_PER_PAGE = 4

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
  })
  const [textToFilter, setTextToFilter] = useState("")
  const  [currentPage, setCurrentPage] = useState(1)

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs(){
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offSet = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offSet)

        const queryParams = params.toString()
        
        const response =  await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)

      } catch (error){
        console.log('Error fetching jobs: ', error)

      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, textToFilter, currentPage])


  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  }
}

export function SearchPage() {

  const { 
    jobs,
    total,
    loading, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handleSearch, 
    handleTextFilter 
  } = useFilters()

  const title = `Resultado: ${total}, Pagina ${currentPage} - DevJobs`

  return (
  <>
    <main>
      <title>{title}</title>
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
      
        <section>
          <h2 style={{ textAlign: 'center' }}>Resultados de la busqueda</h2>
          
          {
            loading ? <p>Cargando empleos...</p> : 
            <JobListings jobs={jobs}/>
          }
          {/* <JobListings jobs={jobs} /> */}

          <Pagination  
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}/>

        </section>
            
    </main>
  </>

  )
}

