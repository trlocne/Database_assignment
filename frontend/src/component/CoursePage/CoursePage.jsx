
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import api from '../../hooks/api';

// CourseCard Component
const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/course/${course.code}`);
  };

  // Star rating display
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src={course.thumbnail || "/api/placeholder/192/128"} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">
            <span className="bg-gray-100 px-2 py-1 rounded">{course.category}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
          <div className="text-sm text-gray-600 mb-2 flex items-center gap-3">
            <span>by {course.teacherName}</span>
            <StarRating rating={course.rating} />
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{course.duration} Minutes</span>
            <span>{course.numberOfLearner} Students</span>
            <span>Rating: {course.rating}</span>
            <span>{course.numberOfLessons} Lessons</span>
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

// Ratings Filter Section
const RatingsFilterSection = ({ selectedRatings, onChange }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">Instructor Rating</h3>
    {[5, 4, 3, 2, 1].map((rating) => (
      <div key={rating} className="flex items-center justify-between mb-1">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedRatings.includes(rating)}
            onChange={() => onChange(rating)}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm"></span>
          </div>
        </label>
      </div>
    ))}
  </div>
);

// Main CourseListing Component
const CourseListing = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [sampleCourses, setSampleCourses] = useState([]);

  
  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => {
      const isSelected = prev.includes(rating);
      if (isSelected) {
        return prev.filter(r => r !== rating);
      }
      return [...prev, rating];
    });
    setCurrentPage(1);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(sampleCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = sampleCourses.slice(startIndex, endIndex);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategories, selectedInstructors, selectedLevels, currentPage]);

  useEffect(() => {
    api.get('/courses?searchFlag=0')
      .then((res) => {
        console.log(res.data.data);
        setSampleCourses(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  , []);

  useEffect(() => {
    api.get(`/courses?searchFlag=1&teacherName=${searchTerm1}&title=${searchTerm}&rating=${selectedRatings}`)
      .then((res) => {
        console.log(res.data.data);
        setSampleCourses(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  , [searchTerm, searchTerm1, selectedRatings]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <h3 className="font-semibold mb-2">Search courses</h3>
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

            <h3 className="font-semibold mb-2">Search teachers</h3>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm1}
                onChange={(e) => {
                  setSearchTerm1(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-2 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            <RatingsFilterSection
              selectedRatings={selectedRatings}
              onChange={handleRatingChange}
            />
          </div>
        </div>

        {/* Course Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Courses</h1>
            <span className="text-gray-600">
              Showing {sampleCourses.length} courses
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
          {sampleCourses.length > 0 && (
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