import React, { useState } from 'react';  
import { Play, RotateCcw, Settings, Maximize2 } from 'lucide-react';  

const VideoPlayer = () => {  
  const [currentTime, setCurrentTime] = useState('05:42');  
  const [duration, setDuration] = useState('08:23');  

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

const ModuleItem = ({ number, title, duration, isActive, isCompleted }) => (  
  <div className={`flex items-center gap-3 p-3 rounded-lg ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>  
    <div className={`w-5 h-5 flex items-center justify-center rounded-full border  
      ${isCompleted ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>  
      {isCompleted && (  
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />  
        </svg>  
      )}  
    </div>  
    <div className="flex-1">  
      <div className="flex items-center gap-2">  
        <span className="text-sm font-medium">{number}</span>  
        <span className="text-sm text-gray-600">-</span>  
        <span className="text-sm font-medium">{title}</span>  
      </div>  
      <span className="text-xs text-gray-500">({duration})</span>  
    </div>  
  </div>  
);  

const LMSInterface = () => {  
  const modules = [  
    { number: '01', title: 'Welcome!', duration: '3:36', isCompleted: true },  
    { number: '02', title: 'What is product design?', duration: '13:09', isActive: true },  
    { number: '03', title: 'Product designer role defined', duration: '3:36' },  
    { number: '04', title: 'A little bit of a background...', duration: '7:34' },  
    { number: '05', title: 'Benefits of being a product...', duration: '5:12' },  
    { number: '06', title: 'Is this a career for me', duration: '8:45' },  
    { number: '07', title: 'Misconceptions about product...', duration: '7:22' },  
  ];  

  return (  
    <div className="max-w-6xl mx-auto p-6">  
      <h1 className="text-xl font-semibold mb-6">The Ultimate Guide to the best WordPress LMS Plugin</h1>  

      <div className="grid grid-cols-3 gap-6">  
        <div className="col-span-2">  
          <VideoPlayer />  

          <div className="mt-4">  
            <h2 className="text-xl font-semibold">Introduction to Product Design</h2>  
            <div className="flex items-center gap-2 mt-2">  
              <span className="text-gray-600">John Smith</span>  
              <span className="text-gray-400">•</span>  
              <span className="text-gray-600">Sr. Product Designer</span>  
            </div>  

            <div className="mt-4 border-t pt-4">  
              <div className="flex gap-4">  
                <button className="font-medium">Comment</button>  
                <button className="font-medium">Material</button>  
                <button className="font-medium">List Comment</button>  
              </div>  

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
            </div>  
          </div>  
        </div>  

        <div className="col-span-1">  
          <div className="bg-white rounded-lg shadow p-4">  
            <h3 className="text-lg font-semibold mb-2">MODULE</h3>  
            <div className="space-y-1">  
              {modules.map((module) => (  
                <ModuleItem  
                  key={module.number}  
                  number={module.number}  
                  title={module.title}  
                  duration={module.duration}  
                  isActive={module.isActive}  
                  isCompleted={module.isCompleted}  
                />  
              ))}  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default LMSInterface;