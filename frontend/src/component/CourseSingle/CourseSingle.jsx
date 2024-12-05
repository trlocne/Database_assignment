import React, {useEffect, useState} from 'react'
import clock from '../../assets/clock.svg'
import students from '../../assets/students.svg'
import lesson_img from '../../assets/lesson.svg'
import './index.css'
import Rating from '@mui/material/Rating';
import lock from '../../assets/lock.svg'
import check from '../../assets/check.svg'
import video from '../../assets/video.svg'
import quiz from '../../assets/quiz.svg'
import Pagination from '@mui/material/Pagination';
import {CommentItem} from '../../component/CommentItem/'
import Footer from '../../component/Footer/'
function CourseDisplay({ course }) {
    const [openChapterIndex, setOpenChapterIndex] = useState(null);

    const toggleChapter = (index) => {
        setOpenChapterIndex(openChapterIndex === index ? null : index);
    };

    return (
        <div className='course'>
            {/* Course Chapters */}
            {course.body.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className='chapter mb-[15px] border rounded'>
                    {/* Chapter Header */}
                    <div
                        className='chapter-header p-[15px] bg-white flex justify-between items-center cursor-pointer'
                        onClick={() => toggleChapter(chapterIndex)}
                    >
                        <h2 className='text-[18px] font-semibold'>{openChapterIndex === chapterIndex ? '▾' : '▸'} {chapter.chapter.title}</h2>
                        <span className='text-gray-600'>{chapter.chapter.lessons} lessons • {chapter.chapter.time} mins</span>
                    </div>

                    {/* Lessons (visible if expanded) */}
                    {openChapterIndex === chapterIndex && (
                        <div className='lesson-list px-[15px] pb-[15px] bg-white'>
                            {chapter.body.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className='lesson flex justify-between items-center ml-[20px] py-[12px]'>
                                    <div className='flex items-center align-center flex-row'>
                                        {lesson.type === 'video' ? (
                                            <img src={video} alt='video' className='w-[20px] h-[20px] ' />
                                        ) : (
                                            <img src={quiz} alt='quiz' className='w-[20px] h-[20px]' />
                                        )}
                                        <a href={lesson.video} target='_blank' rel='noopener noreferrer' className='pl-[10px]'>{lesson.title}</a>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className='text-right'>{lesson.time}</div>
                                        <div className='ml-[20px]'>
                                            {lesson.status === 'done' ? (
                                                <span><img src={check}></img></span>
                                            ) : (
                                                <span><img src={lock}></img></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export const CourseSingle = () => {
    const [buy, setBuy] = useState(true)
    const [rating, setRating] = useState(4.5)
    const [status, setStatus] = useState(false)
    const [page, setPage] = useState('overview')
    const [pageComment, setPageComment] = useState(1)
    const [commentA, setCommentA] = useState([])
    const [submitRating, setSubmitRating] = useState(0);
    const handlePageComment = (event, value) => {
        setPageComment(value);
    };
    const handleCommentSubmit = () => {
        const commentText = document.querySelector('textarea').value; // Lấy giá trị từ textarea
        if (commentText) {
            const newComment = {
                id: Date.now(), // Tạo ID mới
                comment: commentText,
                user: {
                    name: "User   Name", // Thay thế bằng tên người dùng thực
                    avatar: "https://via.placeholder.com/150", // Thay thế bằng ảnh đại diện thực
                },
                time: new Date().toLocaleDateString(),
                rating: submitRating, // Sử dụng giá trị rating hiện tại
                comment_childen: []
            };
            
            // Cập nhật state với bình luận mới
            setCommentA(prevComments => [...prevComments, newComment]);
            
            // Xóa nội dung textarea và reset rating
            document.querySelector('textarea').value = '';
            setSubmitRating(0);
        } else {
            alert("Please enter a comment."); // Thông báo nếu không có bình luận
        }
    }
    
    useEffect(() => {
        let start = 3 * (pageComment - 1);
        let end = Math.min(3 * pageComment, comment.length);
        setCommentA(comment.slice(start, end))
    }, [pageComment])
    const course = {
    'header': {
        'title': 'The Ultimate Guide to the best WordPress LMS Plugin',
        'author': 'Admin',
        'time': 10,
        'students': 20,
        'lessons': 20,
        'rating': 3,
        'status': 'done',
        'price': 20,
        'requirements': ['HTML', 'CSS', 'Javascript'],
        'languages': ['VietNam', 'English'],
        'thumbnail': 'https://via.placeholder.com/1281x720',
        'description': 'LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.'
    },
    'body': 
        [{
            'chapter' : {
                'title': 'Lessons with video content',
                'lessons': 20,
                'time': 10,
            },
            'body': [
                {
                    'title': 'Linear Regression and Gradient Descent',
                    'video': 'https://www.youtube.com/watch?v=4b4MUYve_U8&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=2',
                    'time': '1:18:16',
                    'status': 'done',
                    'type': 'video'
                },
                {
                    'title': 'Locally Weighted & Logistic Regression',
                    'video': 'https://www.youtube.com/watch?v=het9HFqo1TQ&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=3',
                    'time': '1:19:34',
                    'status': 'progress',
                    'type': 'video'
                },
                {
                    'title': 'Perceptron & Generalized Linear Model',
                    'video': 'https://www.youtube.com/watch?v=iZTeva0WSTQ&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=4',
                    'time': '1:18:16',
                    'status': 'done',
                    'type': 'video'
                },
                {
                    'title': 'Quiz 1',
                    'video': 'https://www.youtube.com/watch?v=iZTeva0WSTQ&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=4',
                    'time': '20:00',
                    'status': 'done',
                    'type': 'quiz'
                }
            ]

        },
        {
            'chapter' : {
                'title': 'Lessons with video content',
                'lessons': 20,
                'time': 10,
            },
            'body': [
                {
                    'title': 'Linear Regression and Gradient Descent',
                    'video': 'https://www.youtube.com/watch?v=4b4MUYve_U8&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=2',
                    'time': '1:18:16',
                    'status': 'done',
                    'type': 'video'
                },
                {
                    'title': 'Locally Weighted & Logistic Regression',
                    'video': 'https://www.youtube.com/watch?v=het9HFqo1TQ&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=3',
                    'time': '1:19:34',
                    'status': 'progress',
                    'type': 'video'
                },
                {
                    'title': 'Perceptron & Generalized Linear Model',
                    'video': 'https://www.youtube.com/watch?v=iZTeva0WSTQ&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=4',
                    'time': '1:18:16',
                    'status': 'done',
                    'type': 'video'
                },
            ]

        }]
    }

    const comment = [
        {
            "id": 2314,
            "comment": "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id sed faucibus bibendum augue id cras purus. At eget euismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": [
                {
                    "id": 2315,
                    "comment": "I agree 1" ,
                    "user": {
                        "name": "Jane Doe",
                        "avatar": "https://via.placeholder.com/150",
                    },
                    "time": "22/12/2022",
                    "rating": null,
                    "comment_childen": []
                },
                {
                    "id": 2316,
                    "comment": "I disagree 2",
                    "user": {
                        "name": "John Doe",
                        "avatar": "https://via.placeholder.com/150",
                    },
                    "time": "22/12/2022",
                    "rating": null,
                    "comment_childen": []
                },
                {
                    "id": 2317,
                    "comment": "I agree 3",
                    "user": {
                        "name": "Jane Doe",
                        "avatar": "https://via.placeholder.com/150",
                    },
                    "time": "22/12/2022",
                    "rating": null,
                    "comment_childen": []
                }
            ]
        },
        {
            "id": 2318,
            "comment": "A good course !!",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2319, 
            "comment": "This is a great course 5, oki !!",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2320,
            "comment": "This is a great course 6, learn to code.",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2321,
            "comment": "This is a great course 7",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2322,
            "comment": "This is a great course 8",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2323,
            "comment": "This is a great course 9",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2324,
            "comment": "This is a great course 10",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2325,
            "comment": "This is a great course 11",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2326,
            "comment": "This is a great course 12",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2327,
            "comment": "This is a great course 13",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2328,
            "comment": "This is a great course 14",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
        {
            "id": 2329,
            "comment": "This is a great course 15",
            "user": {
                "name": "John Doe",
                "avatar": "https://via.placeholder.com/150",
            },
            "time": "22/12/2022",
            "rating": 4.5,
            "comment_childen": []
        },
    ]
    const lms = (category) => {
        const [submitRating, setSubmitRating] = useState(0)
        switch (category) {
            case 'overview':
                return (
                    <div>
                    <div className='py-[20px] px-[30px]'>
                        <div className='text-[24px] font-semibold'>Description</div>
                        <div className='text-[16px] pt-[10px]'>
                            <p>{course.header.description}</p>
                            <div className='flex pt-[10px]'>
                                <p className='font-semibold'>Rating: </p>
                                <Rating precision={0.5} name="half-rating-read" value={course.header.rating} readOnly />
                            </div>
                        </div>
                        <div className='text-[24px] font-semibold pt-[10px]'>Requirements</div>
                        <div className='text-[16px] pt-[10px]'>{course.header.requirements.reduce((previousValue, currentValue) => (previousValue + ', ' + currentValue))}</div>
                        <div className='text-[24px] font-semibold pt-[10px]'>Languages</div>
                        <div className='text-[16px] pt-[10px]'>{course.header.languages.reduce((previousValue, currentValue) => (previousValue + ', ' + currentValue))}</div>
                    </div>
                    </div>)
            case 'course-content':
                return (
                    <div className='py-[20px] px-[30px]'>
                        <div className='pb-[20px]'>{course.header.description}</div>
                        <CourseDisplay course={course} />
                    </div>)
            case 'review':
                return (
                    <div>
                        <div className='py-[20px] px-[30px] pt-[30px] pb-[40px]'>
                            <div className="min-h-[430px]">
                            <div className='text-[24px] font-semibold pb-[20px]'>Comment</div>
                            {commentA.map((comment) => 
                                <CommentItem key={comment.id} comment={comment} />
                            )}
                            </div>
                            <Pagination count={Math.ceil(comment.length / 3)}  siblingCount={0} page={pageComment} onChange={handlePageComment} className='flex flex-col items-center'/>
                        </div>
                        <div className='py-[20px] px-[30px] bg-white pt-[50px]'>
                            <div className='text-[24px] font-semibold'>Write a comment</div>
                            <div className='pt-[10px]'>
                                <textarea className='w-[100%] h-[100px] border-[1px] border-[#EAEAEA] outline-none p-[10px] rounded-xl'></textarea>
                            </div>
                            <div className='bg-white mt-[15px]'>
                            <div className='flex flex-row items-center align-center '>
                                    <div className='text-[24px] font-semibold pr-[10px]'>Rating:</div>
                                    <Rating
                                        name="simple-controlled"
                                        value={submitRating}
                                        onChange={(event, newValue) => {
                                            setSubmitRating(newValue);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='pt-[20px]'>
                                <button className='bg-primary w-[127px] h-[40px] rounded-[20px] text-[18px] font-normal text-white hover:bg-[#030391dd]' onClick={handleCommentSubmit}>Comment</button>
                            </div>
                        </div>
                    </div>)
        }
    }
    
    return (
    <div>
        <div>
            <div className='bg-black w-[100%] text-[#ffff] h-[300px]'>
                <div className='w-[1280px] mx-auto py-[50px] flex flex-row'>
                    <div className='w-[850px]'>
                        <div>
                            <div className='text-[36px] font-semibold leading-[120%]'>
                                {course.header.title}
                            </div>
                            <div className='pt-[20px]'>   
                                by <span className='text-[#cacaca]'>{course.header.author}</span>
                            </div>
                            <ul className='flex flex-row py-[20px]'>
                                <li className='flex flex-row justify-center align-center pr-[25px]'><img src={clock}/> <div className='pl-[10px]'>{course.header.time} Weeks</div></li>
                                <li className='flex flex-row justify-center align-center pr-[25px]'><img src={students}/> <div className='pl-[10px]'>{course.header.students} Students</div></li>
                                <li className='flex flex-row justify-center align-center pr-[25px]'><img src={lesson_img}/> <div className='pl-[10px]'>{course.header.lessons} Lessons</div></li>
                                {course.header.status == 'done' ? <li><button className='bg-[#7abe9633] text-[#68B266] font-semibold px-[10px] rounded-[20px]'>Done</button></li>
                                :<li><button className='bg-[#74addf33] text-[#4957D5] font-semibold px-[10px] rounded-[20px]'>Progress</button></li>}
                            </ul>
                        </div>
                    </div>
                    <div className='relative'>
                        <div className='border-lightGrey border-[1px] rounded-[20px] absolute top-[20px] w-[410px]'>
                            <img src={course.header.thumbnail} className='w-[410px] h-[250px] rounded-t-[20px] bg-lightGrey'/>
                            {buy ?
                            (<div className='text-[24px] font-semibold text-black'>
                                <div className='flex flex-row justify-center align-center bg-white py-[20px] rounded-b-[20px]'>
                                    <div className='text-red mx-[30px]'>{course.header.price}$</div>
                                    <button className='bg-primary w-[127px] h-[40px] rounded-[20px] text-[18px] font-normal text-white mx-[30px] hover:bg-[#030391dd]'>Buy Now</button>
                                </div>
                            </div>) : (
                            <div className='text-[24px] font-semibold text-black'>
                                <div className='flex flex-row justify-center align-center bg-white py-[20px] rounded-b-[20px]'>
                                    <button className='bg-primary w-[127px] h-[40px] rounded-[20px] text-[18px] font-normal text-white mx-[30px] hover:bg-[#030391dd]'>Enroll Now</button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white w-[100%] text-[#ffff]'>
                <div className='w-[1280px] mx-auto py-[50px] flex flex-row'>
                    <div className='w-[850px] text-black px-[10px] text-[16px]'>
                        <div className='bg-lightGrey min-h-[370px] w-[810px]'>
                            <nav className='flex flex-row justify-center bg-white align-center w-[810px] font-medium cursor-pointer'>
                                <div className={`w-[270px] text-center py-[20px] text-[20px] hover:bg-[#cacaca] border-[2px] border-[#EAEAEA] ${page == 'overview' ? 'bg-lightGrey text-primary' : 'bg-white text-black' }`} onClick={(e) => {setPage('overview')}} data-type="overiew">Overview</div>
                                <div className={`w-[270px] text-center py-[20px] text-[20px] hover:bg-[#cacaca] border-[2px] border-[#EAEAEA] ${page == 'course-content' ? 'bg-lightGrey text-primary' : 'bg-white text-black' }`} onClick={(e) => {setPage('course-content')}} datatype='course-content'>Course Content</div>
                                <div className={`w-[270px] text-center py-[20px] text-[20px] hover:bg-[#cacaca] border-[2px] border-[#EAEAEA] ${page == 'review' ? 'bg-lightGrey text-primary' : 'bg-white text-black' }`} onClick={(e) => {setPage('review')}} datatype="review">Review</div>
                            </nav>
                            {lms(page)}
                        </div> 
                    </div>    
                </div>
            </div>
        </div>
    </div>
    )
    
}
