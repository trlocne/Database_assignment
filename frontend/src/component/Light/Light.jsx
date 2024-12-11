import React, { useContext, useEffect, useState } from "react";
import { Play, RotateCcw, Settings, Maximize2 } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import {
  videoState,
  updateTakingQuiz,
  updateIsTakingQuizModal,
} from "./../../redux/videoReducer.js";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Menu,
  Modal,
  Input,
  Form,
  Dropdown,
  Select,
  Button,
  Radio,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CommentItem } from "../CommentItem/index.jsx";
import { Pagination } from "@mui/material";
import { NotificationContext } from "../../App.jsx";
import QuestionList from "../QuestionList/QuestionList.jsx";
import api from "../../hooks/api.js";
import { useParams } from "react-router-dom";
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo.jsx";
const VideoPlayer = ({ source }) => {
  const [currentTime, setCurrentTime] = useState("05:42");
  const [duration, setDuration] = useState("08:23");

  return (
    <div>
      <h2>My Video</h2>
      <video width="600" controls>
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const LMSInterface = () => {
  const { handleNotification } = useContext(NotificationContext);
  const [course, setCourse] = useState({
    Name: "Intro to Programming",
    title: "Beginner Programming",
    Description: "An introduction to basic programming concepts.",
    Requirement: "Basic Math",
    Thumbnail: "",
    Teacher: "Ronaldo",
  });
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [futureTime, setFutureTime] = useState(null);
  const [lectures, setLectures] = useState([]);

  const [materials, setMaterials] = useState([
    {
      Course_Code: "CO1011",
      Chapter: 1,
      Lecture_Number: 1,
      Material: "intro_programming_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 1,
      Lecture_Number: 2,
      Material: "intro_programming_2_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 2,
      Lecture_Number: 1,
      Material: "variables_data_types_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 2,
      Lecture_Number: 2,
      Material: "variables_data_types_2_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 3,
      Lecture_Number: 1,
      Material: "control_structures_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 3,
      Lecture_Number: 2,
      Material: "control_structures_2_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 4,
      Lecture_Number: 1,
      Material: "functions_modular_programming_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 4,
      Lecture_Number: 2,
      Material: "functions_modular_programming_2_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 5,
      Lecture_Number: 1,
      Material: "debugging_techniques_material.pdf",
    },
    {
      Course_Code: "CO1011",
      Chapter: 5,
      Lecture_Number: 2,
      Material: "debugging_techniques_2_material.pdf",
    },
  ]);
  const [sections, setSections] = useState([]);
  const [actualItems, setActualItems] = useState([]);
  const [stateOpenKeys, setStateOpenKeys] = useState(["1"]);
  const [pickedLecture, setPickedLecture] = useState({});
  const [comment, setComment] = useState([
    {
      id: 2314,
      comment:
        "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id sed faucibus bibendum augue id cras purus. At eget euismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [
        {
          id: 2315,
          comment: "I agree 1",
          user: {
            name: "Jane Doe",
            avatar: "https://via.placeholder.com/150",
          },
          time: "22/12/2022",
          rating: null,
          comment_childen: [],
        },
        {
          id: 2316,
          comment: "I disagree 2",
          user: {
            name: "John Doe",
            avatar: "https://via.placeholder.com/150",
          },
          time: "22/12/2022",
          rating: null,
          comment_childen: [],
        },
        {
          id: 2317,
          comment: "I agree 3",
          user: {
            name: "Jane Doe",
            avatar: "https://via.placeholder.com/150",
          },
          time: "22/12/2022",
          rating: null,
          comment_childen: [],
        },
      ],
    },
    {
      id: 2318,
      comment: "This is a great course 4",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2319,
      comment: "This is a great course 5",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2320,
      comment: "This is a great course 6",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2321,
      comment: "This is a great course 7",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2322,
      comment: "This is a great course 8",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2323,
      comment: "This is a great course 9",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2324,
      comment: "This is a great course 10",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2325,
      comment: "This is a great course 11",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2326,
      comment: "This is a great course 12",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2327,
      comment: "This is a great course 13",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2328,
      comment: "This is a great course 14",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
    {
      id: 2329,
      comment: "This is a great course 15",
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150",
      },
      time: "22/12/2022",
      rating: 4.5,
      comment_childen: [],
    },
  ]);
  const { id } = useParams();
  const [pageComment, setPageComment] = useState(1);
  const [commentA, setCommentA] = useState([]);
  const [renderOption, setRenderOption] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [form] = Form.useForm();
  const [isSectionModalVisible, setIsSectionModalVisible] = useState(false);
  const [sectionForm] = Form.useForm();
  const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
  const [quizForm] = Form.useForm();
  const [questionBank, setQuestionBank] = useState([]);
  const { takingQuiz, isTakingQuizModal } = useSelector(videoState);
  const [isTakingQuizModalOpen, setIsTakingQuizModalOpen] = useState(false);
  console.log("questionbank: ", questionBank);
  // Đây là ví dụ question
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [questionForm] = Form.useForm();
  const [correctOption, setCorrectOption] = useState(0);
  const [isRemoveQuizModalOpen, setIsRemoveQuizModalOpen] = useState(false);
  const [comments, setComments] = useState({}); // { courseId: [comments] }
  const [newComment, setNewComment] = useState("");
  const [currentCourseId, setCurrentCourseId] = useState(null); // ID của khóa học hiện tại
  const [currentChapter, setCurrentChapter] = useState();
  const [quiz, setQuiz] = useState([]);
  const handleCommentSubmit = () => {
    if (newComment.trim() && currentCourseId) {
      const commentToAdd = {
        id: Date.now(),
        comment: newComment,
        user: { name: "User  Name", avatar: "https://via.placeholder.com/150" },
        time: new Date().toLocaleString(),
        rating: null,
        comment_children: [],
      };

      setComments((prev) => ({
        ...prev,
        [currentCourseId]: [...(prev[currentCourseId] || []), commentToAdd],
      }));

      setNewComment(""); // Reset ô nhập bình luận
    }
  };
  const handlePageComment = (event, value) => {
    setPageComment(value);
  };
  <div className="py-[20px] px-[30px] pt-[30px] pb-[40px]">
    <div className="min-h-[430px]">
      {comments[currentCourseId]?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
    <Pagination
      count={Math.ceil((comments[currentCourseId]?.length || 0) / 3)}
      siblingCount={0}
      page={pageComment}
      onChange={handlePageComment}
      className="flex flex-col items-center"
    />
  </div>;
  const handleAddNewQuestion = () => {
    questionForm.validateFields().then((values) => {
      console.log("values of questionForm: ", values);
      const newQuestion = {
        questionCode: (questionBank.length + 1).toString(),
        content:
          values.questionType !== "essay"
            ? `${values.questionText} - ${values.options[0]} - ${values.options[1]} - ${values.options[2]} - ${values.options[3]}`
            : values.questionText,
        questionType: values.questionType,
        answers: values.questionType === "essay" ? values.sampleAnswer : null,
      };
      console.log("newQuestion: ", newQuestion);
      setQuestionBank((prev) => [...prev, newQuestion]);
      questionForm.resetFields();
      setCorrectOption(0);
    });
  };
  useEffect(() => {
    const future = new Date(
      currentTime.getTime() + pickedLecture?.Time_of_lecture * 60 * 1000
    ); // Thêm timeQuantity giây
    setFutureTime(future);
  }, [currentTime, pickedLecture?.isQuiz]);

  useEffect(() => {
    let start = 3 * (pageComment - 1);
    let end = Math.min(3 * pageComment, comment.length);
    setCommentA(comment.slice(start, end));
  }, [pageComment]);

  useEffect(() => {
    handleLectureForSection();
  }, [sections]);

  useEffect(() => {
    if (pickedLecture?.isQuiz) setIsTakingQuizModalOpen(true);
    else setIsTakingQuizModalOpen(false);
    console.log("bạn vào useEffect cho pickedLecture");
  }, [pickedLecture]);

  const handleAPISections = async () => {
    const newSections = await api.get(`/courses/${id}/video`);
    console.log("newSections: ", newSections.data.data.courseContent.sections);
    setSections(newSections.data.data.courseContent.sections);
    let newLecture = [];
    newSections.data.data.courseContent.sections.forEach((section) => {
      section.lectures.forEach((lecture) => {
        const tempLecture = { ...lecture, Chapter: section.chapter };
        newLecture.push(tempLecture);
      });
    });
    let newQuiz = [];

    newSections.data.data.courseContent.sections.forEach((section) => {
      let order = section.lectures.length;
      section.quizzes.forEach((quiz) => {
        const tempQuiz = { ...quiz, Chapter: section.chapter, number: ++order };
        newQuiz.push(tempQuiz);
      });
    });
    setQuiz(newQuiz);
    setLectures(newLecture);
  };
  useEffect(() => {
    handleAPISections();
  }, []);

  useEffect(() => {
    if (selectedQuestion) {
      questionForm.setFieldsValue({
        questionText: selectedQuestion.text,
        questionType: selectedQuestion.type,
        options: selectedQuestion.options || ["", "", "", ""],
        sampleAnswer: selectedQuestion.sampleAnswer || "",
      });
      setCorrectOption(selectedQuestion.correctOption || 0);
    }
  }, [selectedQuestion]);
  const showTakingQuizModal = () => {
    setIsTakingQuizModalOpen(true);
  };
  console.log("takingquiz: ", takingQuiz);
  const handleOkTakingQuizModal = () => {
    setIsTakingQuizModalOpen(false);
    dispatch(updateTakingQuiz("true"));
    dispatch(updateIsTakingQuizModal("true"));
    console.log("bạn vào handleOkTakingQuizModal");
  };
  const handleCanCelTakingQuizModal = () => {
    setIsTakingQuizModalOpen(false);
  };
  const showRemoveQuizModal = () => {
    setIsRemoveQuizModalOpen(true);
  };
  const handleOk = (q) => {
    setIsRemoveQuizModalOpen(false);
    handleRemoveQuiz(q);
  };
  const handleCancel = () => {
    setIsRemoveQuizModalOpen(false);
  };

  const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(actualItems);
  console.log("actualItems: ", actualItems);

  const getDropdownMenu = (section) => ({
    items: [
      {
        key: "1",
        label: "Add Lecture",
        onClick: () => {
          setSelectedSection(section);
          setIsModalVisible(true);
          console.log("Opening lecture modal");
        },
      },
      {
        key: "2",
        label: "Add Quiz",
        onClick: () => {
          console.log("Opening quiz modal");
          setSelectedSection(section);
          setIsQuizModalVisible(true);
          console.log("Quiz modal state:", true);
        },
      },
    ],
  });

  const handleLectureForSection = () => {
    let temp_items = [];
    console.log("section in hanldelectureFoSection: ", sections);
    sections.forEach((s, index) => {
      let tempObject = {};
      tempObject["key"] = (index + 1).toString();
      tempObject["label"] = (
        <div className="flex items-center justify-between">
          <span>{s.sectionTitle}</span>
          <Dropdown menu={getDropdownMenu(s)} trigger={["click"]}>
            <PlusCircleOutlined
              onClick={(e) => {
                e.stopPropagation();
                setCurrentChapter(s.chapter);
              }}
              className="ml-2 text-blue-500 hover:text-blue-700"
            />
          </Dropdown>
        </div>
      );
      let children = [];
      let cnt = 0;
      lectures.forEach((l, index_) => {
        if (l.Chapter === s.chapter) {
          cnt++;
          let tempLecture = {};
          tempLecture["key"] = `${
            (index + 1).toString() + l.number.toString()
          }`;
          tempLecture["label"] = l.lectureName;
          tempLecture["icon"] = <FontAwesomeIcon icon={faCircle} />;
          children.push(tempLecture);
        }
      });
      quiz.forEach((q, index_) => {
        if (q.Chapter === s.chapter) {
          cnt++;
          let tempQuiz = {};
          tempQuiz["key"] = `${(index + 1).toString() + cnt.toString()}`;
          tempQuiz["label"] = q.title;
          tempQuiz["icon"] = <FontAwesomeIcon icon={faCircle} />;
          children.push(tempQuiz);
        }
      });
      tempObject["children"] = children;
      temp_items.push(tempObject);
    });
    setActualItems(temp_items);
    setPickedLecture(lectures[0]);
  };

  const renderMaterials = () => {
    return (
      <div className="mt-4">
        <iframe
          src="https://drive.google.com/file/d/10wKFljWZ68W9-of3y6CGJg1uBVvbBvu0/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <iframe
          src="https://drive.google.com/file/d/10wKFljWZ68W9-of3y6CGJg1uBVvbBvu0/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
      </div>
    );
  };
  const renderComment = () => {
    return (
      <div className="py-[20px] px-[30px] pt-[30px] pb-[40px]">
        <div className="min-h-[430px]">
          {commentA.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
        <Pagination
          count={Math.ceil(comment.length / 3)}
          siblingCount={0}
          page={pageComment}
          onChange={handlePageComment}
          className="flex flex-col items-center"
        />
      </div>
    );
  };

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  console.log("quiz: ", quiz);
  const handlePickLecture = (infor) => {
    // setIsTakingQuizModalOpen(true);
    console.log("infor: ", infor);
    console.log("taking Quiz, pickedLecture: ", takingQuiz, pickedLecture);

    console.log("infor: ", infor);
    const key = Number(infor.key);
    let chapter = Math.floor(key / 10) - 1;

    const orderInChapter = key % 10;
    //chapter no luon lon hon chapter that 1 don vi

    console.log("chapter - order: ", chapter, orderInChapter);
    const pickedLectureTemp = lectures.find((l, idx) => {
      console.log("l: ", l);
      return l.Chapter === chapter && l.number === orderInChapter;
    });
    //chapter- code - number
    const pickedQuizTemp = quiz.find;
    console.log("pickedLectureTemp: ", pickedLectureTemp);
    setPickedLecture(pickedLectureTemp);
    if (pickedLectureTemp?.code) {
      setIsTakingQuizModalOpen(true);
      return;
    }
    if (pickedLectureTemp?.code === undefined) {
      dispatch(updateTakingQuiz(false));
      console.log("bạn vào handlepick");
    }
    setCurrentCourseId(currentCourseId);
  };

  const handleCompleteLecture = () => {
    // setActualItems((prev) => [
    //   ...prev,
    //   (actualItems[pickedLecture.Chapter - 1].children[
    //     pickedLecture.Number - 1
    //   ]["icon"] = <FontAwesomeIcon icon={faCircleCheck} />),
    // ]);

    let tempItemsList = [...actualItems];
    tempItemsList[pickedLecture.Chapter].children[pickedLecture.number - 1][
      "icon"
    ] = <FontAwesomeIcon icon={faCircleCheck} />;
    setActualItems(tempItemsList);
  };

  const handleRenderOption = () => {
    if (pickedLecture?.code) return;
    if (renderOption === 1)
      return (
        <div className="mt-4">
          <textarea
            className="w-full p-3 border rounded-lg resize-none"
            placeholder="Comment"
            rows={4}
          />
          <button className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg">
            Comment
          </button>
        </div>
      );
    else if (renderOption === 2) return renderMaterials();
    else return renderComment();
  };

  const showModal = (section, e) => {
    e.stopPropagation();
    setSelectedSection(section);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      // Create new lecture object using selectedSection's Chapter
      const nextLectureNumber =
        selectedSection.lectures && selectedSection.lectures.length > 0
          ? Math.max(
              ...selectedSection.lectures.map((lecture) => lecture.number)
            ) + 1
          : 1;
      console.log(
        "nextLectureNumber - selectedsection: ",
        nextLectureNumber,
        selectedSection
      );
      const newLecture = {
        chapter: selectedSection.chapter, // Use the chapter from selectedSection
        number: parseInt(nextLectureNumber),
        lectureName: values.LName,
        videoUrl: values.Video,
        // time_of_lecture: parseInt(values.Time_of_lecture),
      };
      const response = await api.post(
        `/courses/${id}/sections/${selectedSection.chapter}/lectures`,
        newLecture
      );
      console.log(`response of add lecture from handleModalOk: `, response);
      // Add new lecture to lectures array
      handleAPISections();

      // Update the menu items to show new lecture
      const tempItems = [...actualItems];
      const chapterIndex = newLecture.chapter - 1;

      const newMenuItem = {
        key: `${newLecture.chapter}${newLecture.number}`,
        label: newLecture.l_name,
        icon: <FontAwesomeIcon icon={faCircle} />,
      };

      // Add to existing chapter's children
      if (tempItems[chapterIndex]) {
        tempItems[chapterIndex].children.push(newMenuItem);
        setActualItems(tempItems);
      }

      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showSectionModal = () => {
    setIsSectionModalVisible(true);
  };

  const handleSectionModalOk = async () => {
    sectionForm.validateFields().then(async (values) => {
      // Automatically determine the next Chapter number
      const nextChapterNumber =
        sections.length > 0
          ? Math.max(...sections.map((s) => s.chapter)) + 1
          : 1;

      const newSection = {
        chapter: nextChapterNumber,
        title: values.Title,
        amount_of_time: 0, // Assign a default value or modify as needed
        number_of_lecture: 0, // Assign a default value or modify as needed
      };
      console.log("currentCourseId: ", id);
      const response = await api.post(`/courses/${id}/sections`, newSection);
      console.log("response from handleok about sections add: ", response);
      handleAPISections();

      // Add new section to menu with a unique key
      const newMenuItem = {
        key: newSection.chapter.toString(),
        label: (
          <div className="flex items-center justify-between">
            <span>{newSection.title}</span>
            <Dropdown menu={getDropdownMenu(newSection)} trigger={["click"]}>
              <PlusCircleOutlined
                onClick={(e) => e.stopPropagation()}
                className="ml-2 text-blue-500 hover:text-blue-700"
              />
            </Dropdown>
          </div>
        ),
        children: [], // Initialize with no children
      };

      setActualItems((prev) => [...prev, newMenuItem]);

      setIsSectionModalVisible(false);
      sectionForm.resetFields();
    });
  };

  const handleSectionModalCancel = () => {
    setIsSectionModalVisible(false);
    sectionForm.resetFields();
  };

  const handleQuizModalOk = () => {
    quizForm.validateFields().then(async (values) => {
      const newQuiz = {
        code: `QUIZ${lectures.length + 1}_${Date.now()}`,
        title: values.title,
        homeworkTime: parseInt(values.duration),
        passScore: 8.5,
        questions: questionBank,
      };
      const response = await api.post(
        `/courses/${id}/sections/${currentChapter}/quizzes`,
        newQuiz
      );
      console.log("response of add quiz from handleQuizModalOk: ", response);
      // Add new quiz to lectures array
      handleAPISections();

      setIsQuizModalVisible(false);
      quizForm.resetFields();
      setSelectedQuestion(null);
    });
  };

  const handleQuizModalCancel = () => {
    setIsQuizModalVisible(false);
  };

  const handleRemoveQuiz = (q) => {
    let newQuestionBank = questionBank.filter((q_) => q_.id !== q.id);
    setQuestionBank(newQuestionBank);
    setSelectedQuestion({});
    handleNotification("Quiz được xóa thành công", "success");
  };

  const renderQuizModal = () => (
    <Modal
      title={<div className="text-xl font-bold">Create Quiz</div>}
      open={isQuizModalVisible}
      onOk={handleQuizModalOk}
      onCancel={handleQuizModalCancel}
      width={1200}
    >
      <div className="flex gap-4 h-[600px]">
        {/* Left half - Question Bank */}
        <div className="w-1/3 border-r pr-4">
          <h3 className="text-lg font-semibold mb-4">Question Bank</h3>
          <div className="h-[calc(100%-2rem)] overflow-y-auto">
            {questionBank.map((question) => (
              <div
                key={question.id}
                className={`p-3 border mb-2 rounded cursor-pointer flex justify-between items-center hover:bg-gray-50 ${
                  selectedQuestion?.id === question.id
                    ? "bg-blue-50 border-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedQuestion(question)}
              >
                <div>
                  <div className="font-medium">{question.text}</div>
                  <div className="text-sm text-gray-500">
                    Type: {question.type}
                  </div>
                </div>
                <div onClick={showRemoveQuizModal}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="hover:text-red duration-200"
                  />
                </div>
              </div>
            ))}
            <Modal
              title="Basic Modal"
              open={isRemoveQuizModalOpen}
              onOk={() => handleOk(selectedQuestion)}
              onCancel={handleCancel}
            >
              Bạn có chắc muốn xóa câu hỏi này !
            </Modal>
          </div>
        </div>

        {/* Right section */}
        <div className="w-2/3 flex flex-col">
          {/* Upper right - Question Editor */}
          <div className="h-2/3 border-b pb-4">
            <h3 className="text-lg font-semibold mb-4">Question Editor</h3>
            <div className="h-[calc(100%-2rem)] overflow-y-auto p-4 bg-gray-50 rounded">
              <Form form={questionForm} layout="vertical">
                <Form.Item
                  name="questionText"
                  label="Question"
                  rules={[
                    { required: true, message: "Please enter your question" },
                  ]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Enter your question here"
                  />
                </Form.Item>

                <Form.Item
                  name="questionType"
                  label="Question Type"
                  initialValue="multiple_choice"
                >
                  <Select onChange={(value) => setQuestionType(value)}>
                    <Select.Option value="multiple_choice">
                      Multiple Choice
                    </Select.Option>
                    <Select.Option value="essay">Essay</Select.Option>
                  </Select>
                </Form.Item>

                {questionType === "multiple_choice" ? (
                  <Form.List name="options" initialValue={["", "", "", ""]}>
                    {(fields) => (
                      <div className="space-y-2">
                        {fields.map((field, index) => (
                          <Form.Item
                            key={field.key}
                            {...field}
                            label={`Option ${index + 1}`}
                          >
                            <div className="flex items-center gap-2">
                              <Radio
                                checked={correctOption === index}
                                onChange={() => setCorrectOption(index)}
                              />
                              <Input
                                className="flex-1"
                                placeholder={`Enter option ${index + 1}`}
                              />
                            </div>
                          </Form.Item>
                        ))}
                      </div>
                    )}
                  </Form.List>
                ) : (
                  <Form.Item name="sampleAnswer" label="Sample Answer">
                    <Input.TextArea
                      rows={4}
                      placeholder="Enter a sample answer or solution"
                    />
                  </Form.Item>
                )}

                <Button
                  type="primary"
                  onClick={handleAddNewQuestion}
                  className="mt-4 bg-blue-500 hover:bg-blue-600"
                >
                  Add to Question Bank
                </Button>
              </Form>
            </div>
          </div>

          {/* Lower right - Quiz Settings */}
          <div className="h-1/3 pt-4">
            <h3 className="text-lg font-semibold mb-4">Quiz Settings</h3>
            <Form form={quizForm} layout="vertical">
              <Form.Item
                name="title"
                label="Quiz Title"
                rules={[{ required: true, message: "Please enter quiz title" }]}
              >
                <Input placeholder="Enter quiz title" />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration (minutes)"
                rules={[{ required: true, message: "Please enter duration" }]}
              >
                <Input type="number" placeholder="Enter duration in minutes" />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );

  const getYoutubeVideoId = () => {
    const url = pickedLecture.video;
    const videoId = url.split("v=")[1];
    console.log("videoId: ", videoId);
    return videoId;
  };
  const renderHomeWorkTime = (date) => {
    const hours = date?.getHours().toString().padStart(2, "0");
    const minutes = date?.getMinutes().toString().padStart(2, "0");
    const seconds = date?.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const renderContentOfTakingQuizModal = () => {
    const content = isTakingQuizModal
      ? "Bạn đang thực hiện bài Quiz !!!"
      : `Bạn có chắc chắn muốn thực hiện bài Quiz ?
      Thời lượng: ${pickedLecture?.Time_of_lecture} phút
      Time: ${renderHomeWorkTime(currentTime)} - ${renderHomeWorkTime(
          futureTime
        )}`;
    return content.split("\n").map((line, index) => (
      <>
        {line}
        <br />
      </>
    ));
  };
  console.log("pickedLecture: ", pickedLecture);
  return (
    <>
      {/* modal để xác nhận lại xem người dùng có muốn làm quiz hay không */}
      <Modal
        title="Thực hiện Quiz"
        open={isTakingQuizModalOpen}
        onOk={handleOkTakingQuizModal}
        onCancel={handleCanCelTakingQuizModal}
      >
        {renderContentOfTakingQuizModal()}
      </Modal>
      <Modal
        title={<div className="text-xl font-bold">Thông tin bài giảng</div>}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <div className="flex gap-4">
          <div className="w-1/5">
            <img
              src="https://via.placeholder.com/160"
              alt="Lecture thumbnail"
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="flex-1">
            <Form form={form} layout="vertical">
              <Form.Item name="LName" label="Tên bài giảng">
                <Input />
              </Form.Item>
              <Form.Item name="Video" label="Video">
                <Input />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>

      <Modal
        title={<div className="text-xl font-bold">Thông tin chương mới</div>}
        open={isSectionModalVisible}
        onOk={handleSectionModalOk}
        onCancel={handleSectionModalCancel}
      >
        <Form form={sectionForm} layout="vertical">
          <Form.Item name="Title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {renderQuizModal()}

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-6">{course.Name}</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {takingQuiz ? (
              <QuestionList
                question={questionBank}
                quizSection={pickedLecture}
              />
            ) : (
              <YoutubeVideo videoId={getYoutubeVideoId} />
            )}

            <div className="mt-4">
              <div
                className={`flex ${
                  pickedLecture?.code ? "justify-end" : "justify-between"
                }`}
              >
                {pickedLecture?.code ? (
                  ""
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">
                      {pickedLecture?.lectureName}
                    </h2>
                    <button
                      className=" py-1 px-4 bg-blue-500  rounded-lg text-white hover:bg-blue-400 h-fit"
                      onClick={handleCompleteLecture}
                    >
                      Complete
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600">John Smith</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Sr. Product Designer</span>
              </div>

              {pickedLecture?.code !== undefined ? (
                ""
              ) : (
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-around">
                    <button
                      className="font-medium hover:text-blue-500 duration-200"
                      onClick={() => setRenderOption(1)}
                    >
                      Comment
                    </button>
                    <button
                      className="font-medium hover:text-blue-500 duration-200"
                      onClick={() => setRenderOption(2)}
                    >
                      Material
                    </button>
                    <button
                      className="font-medium hover:text-blue-500 duration-200"
                      onClick={() => setRenderOption(3)}
                    >
                      List Comment
                    </button>
                  </div>
                </div>
              )}
              {handleRenderOption()}
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">MODULE</h3>
                <button
                  onClick={showSectionModal}
                  className="p-1 text-blue-500 hover:text-blue-700"
                >
                  <PlusCircleOutlined />
                </button>
              </div>
              <div className="space-y-1">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["11"]}
                  openKeys={stateOpenKeys}
                  onOpenChange={onOpenChange}
                  items={actualItems}
                  onClick={handlePickLecture}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LMSInterface;
