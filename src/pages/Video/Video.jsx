import React from 'react'
import './video.css'
import PlayVideo from '../../component/PlayVideo/PlayVideo'
import Recommanded from '../../component/recommand/recommanded'
import { useParams } from 'react-router-dom'

function video() {
  const {videoId, categoryId} = useParams()
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}/>
      <Recommanded/>
      
    </div>
  )
}

export default video
