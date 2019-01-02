import React, { Component } from 'react';
import { Carousel, Glyphicon } from 'react-bootstrap';
import { Staff } from '../../data/staff';
import './StaffCarousel.css';


class StaffCarousel extends Component {

    render() {
        return (
            <div>
                <Carousel
                    interval={null}
                    defaultActiveIndex={this.props.id}
                >
                    {Staff.map((item, idx) =>
                        <Carousel.Item key={idx}>
                            <img src={item.img}/>
                            <Carousel.Caption>
                                <div>{item.name}</div>
                                <div>{item.title}</div>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>)}
                </Carousel>
            </div>
        );
    }
}

export default StaffCarousel;