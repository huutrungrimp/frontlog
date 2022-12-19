import * as React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { CardGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../../interface';
import { dataContext } from '../assets/dataProvider';


export default function Portfolio() {
    const username = React.useContext(dataContext)

    return (
        <Row id='portfolio' className='portfolio'>
            <Row className='gx-0'>
                <h1 style={{ textAlign: 'center' }}>Portfolios</h1>
            </Row>
            <Row className='gx-0'>
                <Col xs={12} md lg={6}>
                    <Row className='my-3 text-center gx-0'>
                        <h3>Financial loggers</h3>
                    </Row>
                    <Row className='gx-0'>
                        <Image src="https://tourscanner.com/blog/wp-content/uploads/2022/06/things-to-do-in-Ottawa.jpg" />
                    </Row>
                    <Row className='my-3 gx-0'>
                        <Link to={'/' + username + '/finance'}>Read more</Link>
                    </Row>
                </Col>
                <Col xs={12} md lg={6}>
                    <Row className='my-3 text-center gx-0'>
                        <h3>Covid-19 Dashboard</h3>
                    </Row>
                    <Row className='gx-0'>
                        <Image src="https://tourscanner.com/blog/wp-content/uploads/2022/06/Canadian-Museum-of-History-Ottawa.jpg" />
                    </Row>
                    <Row className='my-3 gx-0'>
                        <Link to='#'>Read more</Link>
                    </Row>
                </Col>
            </Row>
            <Row className='gx-0'>

            </Row>
        </Row>
    );
}