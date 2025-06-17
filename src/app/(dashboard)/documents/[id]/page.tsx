import Chat from '@/components/Chat'
import PDFViewer from '@/components/PDFViewer'
import React from 'react'

const ChatPage = () => {
  return (
	<div className='flex'>
	  <PDFViewer/>
	  <Chat />
	</div>
  )
}

export default ChatPage
