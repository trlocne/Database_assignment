import React, { useEffect } from 'react'
import './index.css'
import reply from '../../assets/reply.svg'

const item = ({comment}) => {
  const [showReply, setShowReply] = React.useState(true)
  useEffect(() => {
    console.log('showReply', showReply)
  }, [showReply])
  return (
    <div className='flex flex-row pb-[20px]'>
      <div className='h-[40px] w-[40px] rounded-[50%] overflow-hidden mr-[10px]'>
        <img src={comment.user.avatar} alt="avatar"className='h-[40px] w-[40px]' />
      </div>
      <div className='w-[85%]'>
        <div className='flex flex-row justify-between'>
          <h3 className='font-semibold'>{comment.user.name}</h3>
          <p className=''>{comment.time}</p>
        </div>
        <p className='text-grey'>
          {comment.comment}
        </p>
        {showReply ? (
        <div className='flex flex-row align-center items-center cursor-pointer pt-[5px]' onClick={() => setShowReply(false)}>
          <img src={reply} alt="reply" className='h-[15px] w-[15px]' />
          <span className='pl-[5px]'>Reply</span>
        </div>) : (
        <div className='flex flex-row align-center items-center cursor-pointer pt-[5px]'>
          <input type='text' className='w-[80%] h-[25px] bg-lightGrey outline-none pl-[5px] border-b-[1px] border-b-[#000]' />
          <span className='pl-[5px]' onClick={() => setShowReply(true)}>Reply</span>
        </div>
        )}
      </div>
    </div>
  )
}

export const CommentItem = ({ comment }) => {
  return (
    <div className='border-t-[1px] border-t-[#EAEAEA] pt-[20px]'>
      {item({comment})}
      {comment.comment_childen.map((commentItem) => (
        <div className='pl-[20px]'>
          {item({comment: commentItem})}
        </div>
      ))}
    </div>
  );
};