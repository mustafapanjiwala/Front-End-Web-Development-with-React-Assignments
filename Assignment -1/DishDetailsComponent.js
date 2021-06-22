import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardTitle,CardText} from 'reactstrap';
import {Row} from 'reactstrap';

class DishDetails extends Component
{
    constructor(props)
    {
        super(props);

        this.state={
            SelectedDish:null
        }
    }


    onDishSelect(dish)
    {
        this.setState({ SelectedDish :dish });
    }
    
    renderDish=(dish)=>
    {
        return(
                <div className="container">
                   <Card onClick={ ()=> {
                        return this.onDishSelect(this.props.dish);
                    }}>
                        <CardImg className="Cardimag" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                );
    }

    renderComments=(dish)=>{
                return(
                    <div className="container">
                        <Card onClick={ ()=> {
                        return this.onDishSelect(this.props.dish);
                    }}>
                    <h4>Comments</h4>
                    <Row key={dish.id}>
                        <Row>{dish.Comments}</Row>
                        <Row className="w-100">
                            <div className="Col" md="fluid">--{dish.author}</div>
                        </Row>
                    </Row>
                    </Card>
            </div>
                );
}

    render()
    {
        console.log(this.props.comments);

        const detail= this.props.comments.map(dish=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-1">
                    <Card onClick={ ()=> {
                        return this.onDishSelect(dish);
                    }}>
                        <CardImg width="400px" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                        {detail}
                </div>
                <div className="row">
                    {this.renderDish(this.state.SelectedDish)}
                </div>
                <div className="row">
                    {this.renderComments(this.state.SelectedDish)}
                </div>
            </div>
        );
    }
}

export default DishDetails;
/*

<div className="row">
                        <Card>
                            <div className="col-12 col-md-5 m-1">
                                {this.renderDish(props.dish)}
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                {this.renderComments(props.comments)}
                            </div>
                        </Card>
                    </div>*/