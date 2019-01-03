import React, { Component } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { Staff } from '../../data/staff';
import './StaffCarousel.css';


class StaffCarousel extends Component {

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onChange}>
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                        <Carousel
                            interval={null}
                            // defaultActiveIndex={this.props.id}
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
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default StaffCarousel;