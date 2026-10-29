import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link 
      onClick={() => scrollTo(0, 0)} 
      to={'/course/' + course._id} 
      className="border border-gray-500/20 overflow-hidden rounded-xl bg-white flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-full aspect-video overflow-hidden bg-gray-100">
        <img 
          className="w-full h-full object-cover" 
          src={course.courseThumbnail} 
          alt={course.courseTitle} 
        />
      </div>

      <div className="p-4 text-left flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
            {course.courseTitle}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {course.educator?.name || 'Instructor'}
          </p>
        </div>

        <div className="mt-3">
          <div className="flex items-center space-x-2 text-sm">
            <p className="font-medium text-amber-500">{calculateRating(course)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="w-3.5 h-3.5"
                  src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                  alt="star"
                />
              ))}
            </div>
            <p className="text-gray-400">({course.courseRatings?.length || 0})</p>
          </div>

          <p className="text-lg font-bold text-gray-900 mt-2">
            {currency}{(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
