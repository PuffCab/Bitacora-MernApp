import React from 'react'
import { cities } from '../../dummyData'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'

 function Feed() {
    return (
        <div className="feed">
            <div className="feedContainer">
                 <Share/>
                 {cities.map((p) => (
                    <Post post={p} key={p.id}/>
                 ))}
                 
            </div>

        </div>
    )
}

export default Feed