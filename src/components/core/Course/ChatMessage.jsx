import React from 'react'
import ReactMarkdown from 'react-markdown'
import ChatbotIcon from './ChatbotIcon'

// Enhanced markdown components for better formatting
const markdownComponents = {
  h1: ({node, ...props}) => <h1 className='text-2xl font-bold mt-4 mb-2 text-white' {...props} />,
  h2: ({node, ...props}) => <h2 className='text-xl font-bold mt-3 mb-2 text-blue-300' {...props} />,
  h3: ({node, ...props}) => <h3 className='text-lg font-bold mt-2 mb-1 text-blue-200' {...props} />,
  p: ({node, ...props}) => <p className='text-richblack-100 mb-3 leading-relaxed' {...props} />,
  strong: ({node, ...props}) => <strong className='font-bold text-yellow-300' {...props} />,
  em: ({node, ...props}) => <em className='italic text-cyan-300' {...props} />,
  ul: ({node, ...props}) => <ul className='list-disc list-inside my-3 ml-2 text-richblack-100' {...props} />,
  ol: ({node, ...props}) => <ol className='list-decimal list-inside my-3 ml-2 text-richblack-100' {...props} />,
  li: ({node, ...props}) => <li className='mb-1 ml-2' {...props} />,
  code: ({node, inline, ...props}) => 
    inline 
      ? <code className='bg-richblack-700 px-2 py-1 rounded text-cyan-400 font-mono text-sm' {...props} />
      : <code className='bg-richblack-800 block p-3 rounded my-2 text-cyan-300 font-mono text-sm overflow-x-auto' {...props} />,
  pre: ({node, ...props}) => <pre className='bg-richblack-800 p-3 rounded my-2 overflow-x-auto' {...props} />,
  blockquote: ({node, ...props}) => <blockquote className='border-l-4 border-blue-400 pl-4 italic text-richblack-200 my-2' {...props} />,
  a: ({node, ...props}) => <a className='text-blue-400 hover:underline' {...props} />,
}

// Show icon and background for bot/model only
const ChatMessage = ({ chat }) => (
  <div className={`message ${chat.role === 'model' ? 'bot-message' : 'user-message'}`}>
    {chat.role === 'model' && <ChatbotIcon />}
    <div className='message-text'>
      {chat.role === 'model' ? (
        <ReactMarkdown components={markdownComponents}>
          {chat.text}
        </ReactMarkdown>
      ) : (
        <p className='text-richblack-50'>{chat.text}</p>
      )}
    </div>
  </div>
)

export default ChatMessage
