import React from 'react'
import { useNavigate } from 'react-router-dom'
import EnhancedFlyingPosters from './EnhancedFlyingPosters'
const Work = () => {
    const navigate = useNavigate()
    const projectImages = [
        '/assets/placeholder-projects/project1.jpg',
        '/assets/placeholder-projects/project2.jpg', 
        '/assets/placeholder-projects/project3.jpg',
        '/assets/placeholder-projects/project4.jpg',
        '/assets/placeholder-projects/project5.jpg',
        '/assets/placeholder-projects/project6.jpg'
      ];
  return (
    <section id="projects" className="relative bg-black min-h-[300vh] overflow-hidden">
            <EnhancedFlyingPosters items={projectImages} />
            <div className='flex justify-center items-center  text-white text-4xl'>
            <button className=" border border-white text-white px-6 py-3 text-sm tracking-wider uppercase flex items-center gap-2  hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => navigate('/YoussefHamadPortfolio/work')}
              >
                See All Work
                <span className="text-lg">→</span>
              </button>
            </div>
          </section>
  )
}

export default Work