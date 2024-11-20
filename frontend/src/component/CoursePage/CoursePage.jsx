// import React from 'react';  


import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

// CourseCard Component
const CourseCard = ({ course }) => (
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
          <button className="text-blue-600 hover:text-blue-700 transition-colors">
            View More
          </button>
        </div>
      </div>
    </div>
  </Card>
);

// FilterSection Component
const FilterSection = ({ title, options, selected, onChange }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {options.map((option) => (
      <div key={option.value} className="flex items-center justify-between mb-1">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          {option.label}
        </label>
        <span className="text-gray-500 text-sm">{option.count}</span>
      </div>
    ))}
  </div>
);

// Main CourseListing Component
const CourseListing = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample Data
  const sampleCourses = [
    {
      id: 1,
      title: 'Introduction to Photography',
      instructor: 'John Doe',
      category: 'Photography',
      duration: 4,
      students: 256,
      lessons: 24,
      price: 49.99,
      level: 'Beginner',
      image: '/api/placeholder/192/128'
    },
    {
      id: 2,
      title: 'Advanced Web Development',
      instructor: 'Jane Smith',
      category: 'Development',
      duration: 8,
      students: 428,
      lessons: 42,
      price: 79.99,
      level: 'Advanced',
      image: '/api/placeholder/192/128'
    },
    {
      id: 3,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Mike Johnson',
      category: 'Marketing',
      duration: 6,
      students: 312,
      lessons: 32,
      price: 59.99,
      level: 'Intermediate',
      image: '/api/placeholder/192/128'
    },
    // Add more sample courses as needed
  ];

  const categories = [
    { label: 'Photography', value: 'photography', count: 15 },
    { label: 'Development', value: 'development', count: 12 },
    { label: 'Marketing', value: 'marketing', count: 8 },
    { label: 'Business', value: 'business', count: 10 },
  ];

  const instructors = [
    { label: 'John Doe', value: 'john-doe', count: 5 },
    { label: 'Jane Smith', value: 'jane-smith', count: 4 },
    { label: 'Mike Johnson', value: 'mike-johnson', count: 3 },
  ];

  const levels = [
    { label: 'Beginner', value: 'beginner', count: 12 },
    { label: 'Intermediate', value: 'intermediate', count: 8 },
    { label: 'Advanced', value: 'advanced', count: 5 },
  ];

  // Filter Handlers
  const handleCategoryChange = (value) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter(v => v !== value);
      }
      return [...prev, value];
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleInstructorChange = (value) => {
    setSelectedInstructors(prev => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter(v => v !== value);
      }
      return [...prev, value];
    });
    setCurrentPage(1);
  };

  const handleLevelChange = (value) => {
    setSelectedLevels(prev => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter(v => v !== value);
      }
      return [...prev, value];
    });
    setCurrentPage(1);
  };

  // Search and Filter Logic
  const filteredCourses = sampleCourses.filter(course => {
    const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const categoryMatch = selectedCategories.length === 0 || 
                         selectedCategories.includes(course.category.toLowerCase());
    
    const instructorMatch = selectedInstructors.length === 0 ||
                           selectedInstructors.includes(course.instructor.toLowerCase());
    
    const levelMatch = selectedLevels.length === 0 ||
                      selectedLevels.includes(course.level.toLowerCase());
    
    return searchMatch && categoryMatch && instructorMatch && levelMatch;
  });

  // Pagination Logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Simulated loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategories, selectedInstructors, selectedLevels, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-2 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            <FilterSection
              title="Course Category"
              options={categories}
              selected={selectedCategories}
              onChange={handleCategoryChange}
            />

            <FilterSection
              title="Instructors"
              options={instructors}
              selected={selectedInstructors}
              onChange={handleInstructorChange}
            />

            <FilterSection
              title="Level"
              options={levels}
              selected={selectedLevels}
              onChange={handleLevelChange}
            />
          </div>
        </div>

        {/* Course Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Courses</h1>
            <span className="text-gray-600">
              Showing {filteredCourses.length} courses
            </span>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredCourses.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              <button 
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded border transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button 
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseListing;