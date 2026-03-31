import React, {useState, useEffect} from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {

  const {navigate , allCourses} = useContext(AppContext);
  const {input} = useParams()
  const [filteredCourse , setFilteredCourse] = useState([])

  //function used to show the filtered courses after searching them inside the search box of the website and chrome both..
  useEffect(()=>{
    if(allCourses && allCourses.length >0){
      const tempCourses = allCourses.slice()
      
      input ? 
      setFilteredCourse(
        tempCourses.filter(
          item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      )
      : setFilteredCourse(tempCourses)
    }
    
  } ,[allCourses, input]) 

  return (
    <>
    <div className='relative md:px-36 px-8 pt-20 text-left'>
      <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
        <div>
        <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
        <p className="text-gray-500">
          <span className='text-blue-600 cursor-pointer' onClick={()=>navigate('/')}>Home</span>
          / <span>Course List</span>
        </p>
        </div>
        <SearchBar data={input}/>
      </div>

      {/* it will add a button in top of the filtered courses showing the searched input course 
      you will able to get back to all course from the filtered course by clicking on it...  */}
      {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 
      -mb-8 text-gray-600'>
            <p>{input}</p>
                <img src={assets.cross_icon} alt="" className='cursor-pointer'  onClick={() => navigate('/course-list')} />
                </div>
                 }

       {/*filtered function used there with map() to show all the filterd courses
       here we also used css for the mobile view and big screen view   */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
        {filteredCourse.map((course, index)=> <CourseCard key={index}
         course={course}/>)}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default CoursesList
