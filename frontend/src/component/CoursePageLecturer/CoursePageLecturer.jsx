import React, { useState, useEffect } from 'react';  
import { Search, Plus, X, Trash2, Upload, Check } from 'lucide-react';  
import { Card, CardContent } from '../ui/card';  
import { useNavigate, useParams } from 'react-router-dom';  

const MultiSelect = ({ options, selected, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const toggleAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map(opt => opt.value));
    }
  };

  return (
    <div className="relative">
      <div 
        className="w-full p-2 border rounded flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">
          {selected.length ? `${selected.length} selected` : label}
        </span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400"
        >
          {isOpen ? '▼' : '▲'}
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
          <div 
            className="p-2 hover:bg-gray-50 cursor-pointer border-b flex items-center"
            onClick={toggleAll}
          >
            <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
              {selected.length === options.length && <Check className="w-3 h-3 text-blue-600" />}
            </div>
            <span>Select all</span>
          </div>
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-gray-50 cursor-pointer flex items-center"
              onClick={() => toggleOption(option.value)}
            >
              <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                {selected.includes(option.value) && <Check className="w-3 h-3 text-blue-600" />}
              </div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const CourseCard = ({ course, onDelete }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/course/${course.code}`);
  };

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
          <div className="flex justify-between items-start">
            <div className="text-sm text-gray-600 mb-1">
              <span className="bg-gray-100 px-2 py-1 rounded">{course.category}</span>
            </div>
            <button 
              onClick={() => onDelete(course.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Delete course"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <div className="text-sm text-gray-600 mb-2">by {course.instructor}</div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{course.duration} Weeks</span>
            <span>{course.students} Students</span>
            <span>{course.lessons} Lessons</span>
            <span>{course.level}</span>
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


const categories = [
  { value: 'photography', label: 'Photography', count: 15 },
  { value: 'development', label: 'Development', count: 20 },
  { value: 'marketing', label: 'Marketing', count: 12 },
  { value: 'business', label: 'Business', count: 8 }
];

const instructors = [
  { value: 'john doe', label: 'John Doe', count: 5 },
  { value: 'jane smith', label: 'Jane Smith', count: 3 },
  { value: 'mike johnson', label: 'Mike Johnson', count: 4 }
];

const levels = [
  { value: 'beginner', label: 'Beginner', count: 10 },
  { value: 'intermediate', label: 'Intermediate', count: 8 },
  { value: 'advanced', label: 'Advanced', count: 6 }
];

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

const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {  
  const [newCourse, setNewCourse] = useState({  
    title: '',  
    instructor: '',  
    category: '',  
    duration: '',  
    code: '',
    language: [],
    // students: '0',  
    // lessons: '',  
    price: '',
    //level: '',
    requirement: '',
    image: '/api/placeholder/192/128',
    topics: [] 
  });  

  const [thumbnailPreview, setThumbnailPreview] = useState('/api/placeholder/192/128');

  const categories = [  
    'Photography', 'Development', 'Marketing', 'Business'  
  ];  

  const levels = ['Beginner', 'Intermediate', 'Advanced'];  

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'vie', label: 'Vietnamese' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'cn', label: 'Chinese' }
   
  ];

  const topicOptions = [
    { label: 'Web Development', value: 'web-dev' },
    { label: 'Mobile Development', value: 'mobile-dev' },
    { label: 'UI Design', value: 'ui-design' },
    { label: 'UX Design', value: 'ux-design' }
  ];

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setNewCourse(prev => ({  
      ...prev,  
      [name]: value  
    }));  
  };  

  const handleTopicsChange = (selected) => {
    setNewCourse(prev => ({
      ...prev,
      topics: selected
    }));
  };

  const handleLanguagesChange = (selected) => {
    setNewCourse(prev => ({
      ...prev,
      language: selected
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setNewCourse(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (!newCourse.title || !newCourse.category || !newCourse.instructor) {  
      alert('Please fill in required fields');  
      return;  
    }  

    const courseToAdd = {  
      ...newCourse,  
      id: Date.now(),
       duration: parseInt(newCourse.duration) || 0,  
       students: parseInt(newCourse.students) || 0,  
       lessons: parseInt(newCourse.lessons) || 0,  
      price: parseFloat(newCourse.price) || 0  
    };  

    onAddCourse(courseToAdd);  
    setNewCourse({  // Reset form
      title: '',  
      instructor: '',  
      category: '',  
      duration: '',  
      // students: '0',  
      lessons: '',  
      code: '',
      requirement: '',
      price: '',  
      //level: '',  
      language: [],
      image: '/api/placeholder/192/128'  
    });
    onClose();  
  };  

  if (!isOpen) return null;  

  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">  
      <div className="bg-white rounded-lg shadow-xl w-[800px] p-6 relative">  
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">  
          <X className="w-6 h-6" />  
        </button>  
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>  
        <form onSubmit={handleSubmit}>  
          <div className="flex gap-6">  
            {/* Left side - Thumbnail */}
            <div className="w-64">
              <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg">
                <img
                  src={thumbnailPreview}
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Upload className="w-4 h-4" />
                  <span>Upload Thumbnail</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            {/* Right side - Form Fields */}
            <div className="flex-1 space-y-4">
            <input  
              type="text"  
              name="title"  
              value={newCourse.title}  
              onChange={handleInputChange}  
              placeholder="Course Title"  
              className="w-full p-2 border rounded"  
              required  
            />  
            <input  
              type="text"  
              name="instructor"  
              value={newCourse.instructor}  
              onChange={handleInputChange}  
              placeholder="Instructor Name"  
              className="w-full p-2 border rounded"  
              required  
            />  
            <select  
              name="category"  
              value={newCourse.category}  
              onChange={handleInputChange}  
              className="w-full p-2 border rounded"  
              required  
            >  
              <option value="">Select Category</option>  
              {categories.map(cat => (  
                <option key={cat} value={cat}>{cat}</option>  
              ))}  
            </select>  
            {/* <select  
              name="level"  
              value={newCourse.level}  
              onChange={handleInputChange}  
              className="w-full p-2 border rounded"  
              required  
             >  
              <option value="">Select Level</option>  
              {levels.map(level => (  
                <option key={level} value={level}>{level}</option>  
              ))}  
             </select>   */}

             

             <MultiSelect
              options={topicOptions}
              selected={newCourse.topics}
              onChange={handleTopicsChange}
              label="Select Topics"
             />

              <input  
                type="number"  
                name="duration"  
                value={newCourse.duration}  
                onChange={handleInputChange}  
                placeholder="Duration (days)"  
                className="w-full p-2 border rounded"  
                min="1"  
              />  

              <input  
                type="text"  
                name="requirement"  
                value={newCourse.requirement}  
                onChange={handleInputChange}  
                placeholder="Courses Requirement"  
                className="w-full p-2 border rounded"  
                min="1"  
              />  


             <MultiSelect
              options={languages}
              selected={newCourse.language}
              onChange={handleLanguagesChange}
              label="Select Languages"
             />
              <input  
                type="text"  
                name="code"  
                value={newCourse.code}  
                onChange={handleInputChange}  
                placeholder="Code Course"  
                className="w-full p-2 border rounded"  
                 
              />  
             
             <input  
              type="number"  
              name="price"  
              value={newCourse.price}  
              onChange={handleInputChange}  
              placeholder="Course Price"  
              className="w-full p-2 border rounded"  
              min="0"  
              step="1"  
            />  
            <textarea  
              name="description"  
              value={newCourse.description}  
              onChange={handleInputChange}  
              placeholder="Course Description"  
              className="w-full p-2 border rounded h-20"  
            />  
            </div>
          </div>  
          <div className="flex justify-end space-x-2 mt-4">  
            <button  
              type="button"  
              onClick={onClose}  
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"  
            >  
              Cancel  
            </button>  
            <button  
              type="submit"  
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"  
            >  
              Add Course  
            </button>  
          </div>  
        </form>  
      </div>  
    </div>  
  );  
}; 

const CourseListing = () => {  
  const [courses, setCourses] = useState([
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
    }
  ]);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCourse = (newCourse) => {  
    setCourses(prevCourses => [...prevCourses, newCourse]);  
  };  

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    }
  };

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
  const filteredCourses = courses.filter(course => {
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedInstructors, selectedLevels]);

  // Loading effect
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
                onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* <FilterSection
              title="Instructors"
              options={instructors}
              selected={selectedInstructors}
              onChange={handleInstructorChange}
            /> */}

            {/* <FilterSection
              title="Level"
              options={levels}
              selected={selectedLevels}
              onChange={handleLevelChange}
            /> */}
          </div>
        </div>

        {/* Course Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Courses</h1>
            <button   
              onClick={() => setIsAddCourseModalOpen(true)}  
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"  
            >  
              <Plus className="mr-2 w-5 h-5" />  
              Add Course  
            </button> 
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onDelete={handleDeleteCourse}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredCourses.length > itemsPerPage && (
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

          {/* Add Course Modal */}  
          <AddCourseModal   
            isOpen={isAddCourseModalOpen}  
            onClose={() => setIsAddCourseModalOpen(false)}  
            onAddCourse={handleAddCourse}  
          />  
        </div>
      </div>
    </div>
  );
};

export default CourseListing;
