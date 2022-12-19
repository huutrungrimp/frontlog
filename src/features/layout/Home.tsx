import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Resume from './Resume';
import Portfolio from './Portfolio';
import About from './About';
import { User } from '../../interface';


export default function Home({username}:User) {
    return (
        <div>
            <div className='image4about'>
                <div className='home gx-0'>
                    <About />
                </div>
            </div>
            <div className='image4portfolio'>
                <div className='home gx-0'>
                    <Portfolio username={username} />
                </div>
            </div>
            <div className='image4resume'>
                <div className='home gx-0'>
                    <Resume />
                </div>
            </div>


        </div>
    );
}