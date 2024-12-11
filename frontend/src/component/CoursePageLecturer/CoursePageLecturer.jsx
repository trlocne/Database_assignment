import React, { useState, useEffect } from 'react';  
import { Search, Plus, X, Trash2, Upload, Edit } from 'lucide-react';  
import { Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';  
import { useNavigate } from 'react-router-dom';  
import api from '../../hooks/api';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

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
          {selected?.length ? `${selected?.length} selected` : label}
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

const CourseCard = ({ course, onDelete, onEdit, setUpdateCourse,setIsUpdateCourseModalOpen, courseArr }) => {
  
  const handleUpdateCourse = () => {
    setUpdateCourse(course)
    setIsUpdateCourseModalOpen(true)
  }
  
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/course/${course.code}`);
  };
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
            alt={course.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="text-sm text-gray-600 mb-1">
            <span className="bg-gray-100 px-2 py-1 rounded">{course.category}</span>
          </div>
          <div className="flex items-center gap-2">
              <button 
                onClick={() => handleUpdateCourse()}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                title="Edit course"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onDelete(course.code)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete course"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            </div>
          <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
          <div className="text-sm text-gray-600 mb-2 flex items-center gap-3">
            <span>by {course.teacherName}</span>
            <StarRating rating={course.rating} />
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{course.duration} Minutes</span>
            <span>{course.numberOfLearner} Students</span>
            {/* <span>{course.level}</span> */}
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
const AddCourseModal = ({ isOpen, onClose, setCourses}) => {  
  const [newCourse, setNewCourse] = useState({  
    "code": "",
    "name": "",
    "title": "",
    "status": "",
    "description": "",
    "requirement": "",
    "thumbnail": "",
    "price": "",
    "category": "",
    "languages": []
  });  

  const [thumbnailPreview, setThumbnailPreview] = useState('/api/placeholder/192/128');

  const categories = [  
    'Photography', 'Development', 'Marketing', 'Business'  
  ];  

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' }
   
  ];

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setNewCourse(prev => ({  
      ...prev,  
      [name]: value  
    })); 
  };  

  const handleLanguagesChange = (selected) => {
    setNewCourse(prev => ({  
      ...prev,  
      languages: selected 
    })); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCourse((prev) => ({
        ...prev,
        thumbnail: file, // Keep the file object here for FormData
      }));
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result); // Preview the file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    const formData = new FormData();
    Object.keys(newCourse).forEach((key) => {
      if (key === 'languages') {
        newCourse.languages.forEach((language) => formData.append('language', language)); // Multiple languages
      } else if (key === 'thumbnail') {
        formData.append('thumbnail', newCourse.thumbnail);
      } else {
        formData.append(key, newCourse[key]);
      }
    });
    try {
      const token = localStorage.getItem('JWT_TOKEN');
      const config = {headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }};
      const res = await axios.post('http://localhost:8080/api/courses/create', formData, config);
      api.get('/courses/teacher')
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
      toast.success("Course added successfully");
      setNewCourse({  // Reset form
        "code": "",
        "name": "",
        "title": "",
        "duration": 0,
        "status": "",
        "rating": 0,
        "description": "",
        "requirement": "",
        "thumbnail": "",
        "price": "",
        "numberOfLearner": 0,
        "teacherName": "",
        "category": "",
        "numberOfLessons": 0,
        "languages": [] 
      });
      setThumbnailPreview('/api/placeholder/192/128');
      onClose();
    }
    catch (err) {
      console.error(err);
      toast.error("Failed to add course");
    } 
      
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
                name="code"  
                value={newCourse.code}  
                onChange={handleInputChange}  
                placeholder="Code Course"  
                className="w-full p-2 border rounded"    
            /> 

            <input  
                type="text"  
                name="name"  
                value={newCourse.name}  
                onChange={handleInputChange}  
                placeholder="Course Name"  
                className="w-full p-2 border rounded"    
            />

            <input  
              type="text"  
              name="title"  
              value={newCourse.title}  
              onChange={handleInputChange}  
              placeholder="Course Title"  
              className="w-full p-2 border rounded"  
              required  
            />  

            <select  
              name="status"  
              value={newCourse.status}  
              onChange={handleInputChange}  
              className="w-full p-2 border rounded"  
              required  
            >  
              <option key={`In progress`} value={`In progress`}>In progress</option>
              <option key={"Done"} value={"Done"}>{"Done"}</option>  
            </select>

            <textarea  
              name="description"  
              value={newCourse.description}  
              onChange={handleInputChange}  
              placeholder="Course Description"  
              className="w-full p-2 border rounded h-20"  
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

            <input  
              type="text"  
              name="price"  
              value={newCourse.price}  
              onChange={handleInputChange}  
              placeholder="Course Price"  
              className="w-full p-2 border rounded"  
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
              


             <MultiSelect
              options={languages}
              selected={newCourse.languages}
              onChange={handleLanguagesChange}
              label="Select Languages"
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


const EditCourseModal = ({ isOpen, onClose, updateCourse, setCourses }) => {  
  const [newCourse, setNewCourse] = useState({  
      "code": "",
      "name": "",
      "title": "",
      "status": "",
      "description": "",
      "requirement": "",
      "price": "",
      "category": "",
      "languages": [] 
  });  

  const [thumbnailPreview, setThumbnailPreview] = useState('/api/placeholder/192/128');

  const categories = [  
    'Photography', 'Development', 'Marketing', 'Business'  
  ];  

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' }
   
  ];

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setNewCourse(prev => ({  
      ...prev,  
      [name]: value  
    })); 
  };  

  const handleLanguagesChange = (selected) => {
    setNewCourse(prev => ({  
      ...prev,  
      languages: selected 
    })); 
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    const formData = new FormData();
    Object.keys(newCourse).forEach((key) => {
      if (key === 'languages') {
        newCourse.languages.forEach((language) => formData.append('language', language)); // Multiple languages
      } else if (key === 'thumbnail') {
        formData.append('thumbnail', newCourse.thumbnail);
      } else {
        formData.append(key, newCourse[key]);
      }
    });
    try {
      const token = localStorage.getItem('JWT_TOKEN');
      const config = {headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      }};
      const res = await axios.put('http://localhost:8080/api/courses/update', formData, config);
      api.get('/courses/teacher')
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
      toast.success("Course edit successfully");
      setNewCourse({  // Reset form
        "code": "",
        "name": "",
        "title": "",
        "status": "",
        "description": "",
        "requirement": "",
        "price": "",
        "category": "",
        "languages": [] 
      });
      setThumbnailPreview('/api/placeholder/192/128');
      onClose();
    }
    catch (err) {
      console.error(err);
      toast.error("Failed to edit course");
    } 
      
  };  
  useEffect(() => {
    setNewCourse({
      "code": updateCourse.code,
      "name": updateCourse.name,
      "title": updateCourse.title,
      "status": updateCourse.status,
      "description": updateCourse.description,
      "requirement": updateCourse.requirement,
      "price": updateCourse.price,
      "category": updateCourse.category,
      "languages": updateCourse.languages 
    });
  }, [updateCourse]);


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
            {/* Right side - Form Fields */}
            <div className="flex-1 space-y-4">
            <input  
                type="text"  
                name="code"  
                value={newCourse.code}  
                onChange={handleInputChange}  
                placeholder="Code Course"  
                className="w-full p-2 border rounded" 
                disabled   
            /> 

            <input  
                type="text"  
                name="name"  
                value={newCourse.name}  
                onChange={handleInputChange}  
                placeholder="Course Name"  
                className="w-full p-2 border rounded"    
            />

            <input  
              type="text"  
              name="title"  
              value={newCourse.title}  
              onChange={handleInputChange}  
              placeholder="Course Title"  
              className="w-full p-2 border rounded"  
              required  
            />  

            <select  
              name="status"  
              value={newCourse.status}  
              onChange={handleInputChange}  
              className="w-full p-2 border rounded"  
              required  
            >  
              <option key={`In progress`} value={`In progress`}>In progress</option>
              <option key={"Done"} value={"Done"}>{"Done"}</option>  
            </select>

            <textarea  
              name="description"  
              value={newCourse.description}  
              onChange={handleInputChange}  
              placeholder="Course Description"  
              className="w-full p-2 border rounded h-20"  
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

            <input  
              type="text"  
              name="price"  
              value={newCourse.price}  
              onChange={handleInputChange}  
              placeholder="Course Price"  
              className="w-full p-2 border rounded"  
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
              
             <MultiSelect
              options={languages}
              selected={newCourse.languages}
              onChange={handleLanguagesChange}
              label="Select Languages"
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
              Edit Course  
            </button>  
          </div>  
        </form>  
      </div>  
    </div>  
  );  
}; 

const CourseListing = () => {  
  const [courses, setCourses] = useState([]);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);  
  const [isUpdateCourseModalOpen, setIsUpdateCourseModalOpen] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [updateCourse, setUpdateCourse] = useState({  // Reset form
    "code": "",
    "name": "",
    "title": "",
    "duration": 0,
    "status": "",
    "rating": 0,
    "description": "",
    "requirement": "",
    "thumbnail": "",
    "price": "",
    "numberOfLearner": 0,
    "teacherName": "",
    "category": "",
    "numberOfLessons": 0,
    "languages": []
  });

  const handleAddCourse = (newCourse) => {  
    setCourses(prevCourses => [...prevCourses, newCourse]);  
  };  

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        api.delete(`/courses/${courseId}`)
        .then(() => {
          setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
          return api.get('/courses/teacher');
        })
        .then((res) => {
          setCourses(res.data.data);
          toast.success("Course deleted successfully");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete course");
        });
      }
      catch (err) {
        console.error(err);
        toast.error("Failed to delete course");
      }
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

  // Pagination Logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

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

  useEffect(() => {
    api.get('/courses/teacher')
    .then((res) => {
      setCourses(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  ,[])
  // useEffect(() => {
  //   api.get('/courses/teacher')
  //   .then((res) => {
  //     setCourses(res.data.data);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  // }
  // ,[updateCourse])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
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
            currentCourses.map((c) => (
              <CourseCard 
                key={c.id} 
                course={c} 
                onDelete={handleDeleteCourse}
                setUpdateCourse = {setUpdateCourse}
                setIsUpdateCourseModalOpen={setIsUpdateCourseModalOpen}
                courseArr = {courses}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {courses.length > itemsPerPage && (
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
            updateCourse={updateCourse}
            setCourses={setCourses}
          />  
          <EditCourseModal   
            isOpen={isUpdateCourseModalOpen}  
            onClose={() => setIsUpdateCourseModalOpen(false)}  
            updateCourse={updateCourse}
            setCourses={setCourses}
          />  
        </div>
      </div>
    </div>
  );
};

export default CourseListing;