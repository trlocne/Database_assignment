// import React from 'react';  


import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useNavigate } from 'react-router-dom';

// CourseCard Component
const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/course/${course.id}`);
  };``

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src={course.image || "/api/placeholder/192/128"} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">
            <span className="bg-gray-100 px-2 py-1 rounded">{course.category}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <div className="text-sm text-gray-600 mb-2">by {course.instructor}</div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{course.duration} Weeks</span>
            <span>{course.students} Students</span>
            <span>{course.level}</span>
            <span>{course.lessons} Lessons</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="font-semibold">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </div>
            <button 
              onClick={handleViewMore}
              className="text-blue-600 hover:text-blue-700 transition-colors">
              View More
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const FilterSection = ({ title, options, selected, onChange }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {options.map((option) => (
      <div key={option.label} className="flex items-center justify-between mb-1">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="mr-2"
          />
          {option.label}
        </label>
        <span className="text-gray-500">{option.count}</span>
      </div>
    ))}
  </div>
);

const CourseListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const sampleCourses = [
    {
      id: 1,
      title: 'Create An LMS Website With LearnPress7',
      instructor: 'Determined Pelikas',
      duration: 2,
      students: 156,
      lessons: 20,
      price: 0,
      image: '/api/placeholder/192/128'
    },
    {
        id: 1,
        title: 'Create An LMS Website With LearnPress6',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
      {
        id: 1,
        title: 'Create An LMS Website With LearnPress5',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
      {
        id: 2,
        title: 'Create An LMS Website With LearnPress5',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
      {
        id: 2,
        title: 'Create An LMS Website With LearnPress3',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
      {
        id: 2,
        title: 'Create An LMS Website With LearnPress2',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
      {
        id: 2,
        title: 'Create An LMS Website With LearnPress1',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },

      {
        id: 2,
        title: 'Create An LMS Website With LearnPress2',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
      {
        id: 2,
        title: 'Create An LMS Website With LearnPress1',
        instructor: 'Determined Pelikas',
        duration: 2,
        students: 156,
        lessons: 20,
        price: 0,
        image: '/api/placeholder/192/128'
      },
    // Add more sample courses as needed
  ];

  const categories = [
    { label: 'Commercial', value: 'commercial', count: 15 },
    { label: 'Office', value: 'office', count: 15 },
    { label: 'Shop', value: 'shop', count: 15 },
    { label: 'Educate', value: 'educate', count: 15 },
  ];

  const instructors = [
    { label: 'Kenny White', value: 'kenny', count: 15 },
    { label: 'John Doe', value: 'john', count: 15 },
  ];

  const levels = [
    { label: 'All levels', value: 'all', count: 15 },
    { label: 'Beginner', value: 'beginner', count: 15 },
    { label: 'Intermediate', value: 'intermediate', count: 15 },
    { label: 'Expert', value: 'expert', count: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pr-8 border rounded-lg"
              />
              <Search className="absolute right-2 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            <FilterSection
              title="Course Category"
              options={categories}
              selected={[]}
              onChange={() => {}}
            />

            <FilterSection
              title="Instructors"
              options={instructors}
              selected={[]}
              onChange={() => {}}
            />

            <FilterSection
              title="Level"
              options={levels}
              selected={[]}
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Course Listings */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">All Courses</h1>
          
          {sampleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button 
              className="px-3 py-1 rounded border disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded border ${
                  currentPage === page ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="px-3 py-1 rounded border"
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListing;