import React, { useEffect, useState } from "react";
import { Play, RotateCcw, Settings, Maximize2 } from "lucide-react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { CommentItem } from "../CommentItem/index.jsx";
import { Pagination } from "@mui/material";
const VideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState("05:42");
  const [duration, setDuration] = useState("08:23");

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-purple-600/20" />
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="flex items-center gap-4">
          <Play className="w-6 h-6 text-white cursor-pointer" />
          <RotateCcw className="w-5 h-5 text-white cursor-pointer" />

          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-white/30 rounded-full">
            <div className="w-2/3 h-full bg-white rounded-full" />
          </div>

          <span className="text-white text-sm">{currentTime}</span>
          <span className="text-white/60 text-sm">{duration}</span>
          <Settings className="w-5 h-5 text-white cursor-pointer" />
          <Maximize2 className="w-5 h-5 text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const LMSInterface = () => {
  const [course, setCourse] = useState({
    Name: "Intro to Programming",
    title: "Beginner Programming",
    Description: "An introduction to basic programming concepts.",
    Requirement: "Basic Math",
    Thumbnail: "",
    Teacher: "Ronaldo",
  });

  const [lectures, setLectures] = useState([
    {
      Chapter: 1,
      Number: 1,
      LName: "Introduction to Programming - Lecture 1",
      Video: "intro_programming.mp4",
      Time_of_lecture: 30,
    },
    {
      Chapter: 1,
      Number: 2,
      LName: "Introduction to Programming - Lecture 2",
      Video: "intro_programming_2.mp4",
      Time_of_lecture: 30,
    },
    {
      Chapter: 2,
      Number: 1,
      LName: "Variables and Data Types - Lecture 1",
      Video: "variables_data_types.mp4",
      Time_of_lecture: 45,
    },
    {
      Chapter: 2,
      Number: 2,
      LName: "Variables and Data Types - Lecture 2",
      Video: "variables_data_types_2.mp4",
      Time_of_lecture: 45,
    },
    {
      Chapter: 3,
      Number: 1,
      LName: "Control Structures - Lecture 1",
      Video: "control_structures.mp4",
      Time_of_lecture: 60,
    },
    {
      Chapter: 3,
      Number: 2,
      LName: "Control Structures - Lecture 2",
      Video: "control_structures_2.mp4",
      Time_of_lecture: 60,
    },
    {
      Chapter: 4,
      Number: 1,
      LName: "Functions and Modular Programming - Lecture 1",
      Video: "functions_modular_programming.mp4",
      Time_of_lecture: 75,
    },
    {
      Chapter: 4,
      Number: 2,
      LName: "Functions and Modular Programming - Lecture 2",
      Video: "functions_modular_programming_2.mp4",
      Time_of_lecture: 75,
    },
    {
      Chapter: 5,
      Number: 1,
      LName: "Basic Debugging Techniques - Lecture 1",
      Video: "debugging_techniques.mp4",
      Time_of_lecture: 40,
    },
    {
      Chapter: 5,
      Number: 2,
      LName: "Basic Debugging Techniques - Lecture 2",
      Video: "debugging_techniques_2.mp4",
      Time_of_lecture: 40,
    },
  ]);

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
  const [sections, setSections] = useState([
    {
      Chapter: 1,
      Title: "Introduction to Programming",
      Amount_Of_Time: 30,
      Number_Of_Lecture: 2,
    },
    {
      Chapter: 2,
      Title: "Variables and Data Types",
      Amount_Of_Time: 45,
      Number_Of_Lecture: 3,
    },
    {
      Chapter: 3,
      Title: "Control Structures",
      Amount_Of_Time: 60,
      Number_Of_Lecture: 4,
    },
    {
      Chapter: 4,
      Title: "Functions and Modular Programming",
      Amount_Of_Time: 75,
      Number_Of_Lecture: 5,
    },
    {
      Chapter: 5,
      Title: "Basic Debugging Techniques",
      Amount_Of_Time: 40,
      Number_Of_Lecture: 3,
    },
  ]);
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
  const [pageComment, setPageComment] = useState(1);
  const [commentA, setCommentA] = useState([]);
  const [renderOption, setRenderOption] = useState(1);

  const handlePageComment = (event, value) => {
    setPageComment(value);
  };

  useEffect(() => {
    let start = 3 * (pageComment - 1);
    let end = Math.min(3 * pageComment, comment.length);
    setCommentA(comment.slice(start, end));
  }, [pageComment]);

  useEffect(() => {
    handleLectureForSection();
  }, []);

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
  const handleLectureForSection = () => {
    let temp_items = [];
    sections.forEach((s, index) => {
      let tempObject = {};
      tempObject["key"] = (index + 1).toString();
      // tempObject["icon"] = <FontAwesomeIcon icon={faCircle} />;
      tempObject["label"] = s.Title;
      let children = [];
      lectures.forEach((l, index_) => {
        if (l.Chapter === s.Chapter) {
          let tempLecture = {};
          tempLecture["key"] = `${
            (index + 1).toString() + l.Number.toString()
          }`;
          tempLecture["label"] = l.LName;
          tempLecture["icon"] = <FontAwesomeIcon icon={faCircle} />;
          children.push(tempLecture);
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
          // allow="autoplay"
        ></iframe>
        <iframe
          src="https://drive.google.com/file/d/10wKFljWZ68W9-of3y6CGJg1uBVvbBvu0/preview"
          width="640"
          height="480"
          // allow="autoplay"
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

  const handlePickLecture = (infor) => {
    console.log("infor: ", infor);
    const key = Number(infor.key);
    const chapter = Math.floor(key / 10);
    const orderInChapter = key % 10;

    console.log("chapter - order: ", chapter, orderInChapter);
    const pickedLectureTemp = lectures.find((l, idx) => {
      return l.Chapter === chapter && l.Number == orderInChapter;
    });
    console.log("pickedLectureTemp: ", pickedLectureTemp);
    setPickedLecture(pickedLectureTemp);
  };

  const handleCompleteLecture = () => {
    // setActualItems((prev) => [
    //   ...prev,
    //   (actualItems[pickedLecture.Chapter - 1].children[
    //     pickedLecture.Number - 1
    //   ]["icon"] = <FontAwesomeIcon icon={faCircleCheck} />),
    // ]);

    let tempItemsList = [...actualItems];
    tempItemsList[pickedLecture.Chapter - 1].children[pickedLecture.Number - 1][
      "icon"
    ] = <FontAwesomeIcon icon={faCircleCheck} />;
    setActualItems(tempItemsList);
  };

  const handleRenderOption = () => {
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">{course.Name}</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <VideoPlayer />

          <div className="mt-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{pickedLecture?.LName}</h2>
              <button
                className=" py-1 px-4 bg-green-500 rounded-lg text-white hover:bg-green-400"
                onClick={handleCompleteLecture}
              >
                Complete
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-600">John Smith</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Sr. Product Designer</span>
            </div>

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
            {handleRenderOption()}
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">MODULE</h3>
            <div className="space-y-1">
              <Menu
                mode="inline"
                defaultSelectedKeys={["11"]}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                // style={{
                //   width: 256,
                // }}
                items={actualItems}
                onClick={handlePickLecture}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSInterface;
