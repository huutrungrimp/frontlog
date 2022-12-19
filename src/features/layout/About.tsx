import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

export default function About() {
    return (
        <div id='about' className='row about gx-0'>
            <div className='row gx-0'>
                <h1 style={{ textAlign: 'center', marginBottom: '10px'}}>About me</h1>
            </div>
            <div className='row gx-0'>
                <div className='col-xs-12 col-md-5 gx-md-4'>
                    <p>
                        I have been interested in full-stack development since covid-19 pandemic in 2020, when the availability encouraged me to find new hobbies and another potential pathway for the loss of my work hours at the Hospital Line Services (HLS). Recall the past period, it was a very hard time for me to start programming a web app because I had just been a manual worker, with a very limited knowledge in computer and new programming concepts. However, the patience as well as skills on problem analysis and resolution in my life has helped me to overcome the challenges. After one-year intensive study and practices, I successfully completed “CS50's Web Programming with Python and JavaScript” course from Edx with 6 hand-on experience projects. Since 2021, I have daily spent 3 - 4 hours, between 6:00 am and 10:00 am, on web development, before getting ready for full-time job at the HLS, which allows me to sustain my current life and programming interest.
                    </p>
                    <p>
                        I will keep programming daily and it is certainly one of my hobbies for my old age. However, I always hope to find web development internship opportunities, which allow me to involve in actual projects with other team members.
                    </p>
                </div>
                <div className='col-xs-12 col-md-7 g-md-2'>
                    <Image className='rounded' style={{ width: '100%', height: 'auto' }} src='https://scontent.fxds1-1.fna.fbcdn.net/v/t31.18172-8/22384432_720948938090853_1860083407235717542_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=MYpNkQh9s2QAX-3usNB&_nc_ht=scontent.fxds1-1.fna&oh=00_AfCzRQZlcCehXE6SPsYR7pyhhl88RWY1KDdCLDUpYizTsg&oe=63A899D6' />
                </div>
            </div>

        </div>
    )
}
