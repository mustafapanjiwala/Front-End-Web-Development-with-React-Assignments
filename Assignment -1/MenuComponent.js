import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

class Menu extends Component
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

    renderDish(dish)
    {
        if(dish!=null)
        {
            return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardTitle>{dish.description}</CardTitle>
                </CardBody>
            </Card>);
        }
        else
        {
            return(<div></div>);
        }
    }

    render()
    {

        const menu= this.props.dishes.map(dish=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-1">
                    <Card onClick={ ()=> {
                        return this.onDishSelect(dish);
                    }}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
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
                        {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.SelectedDish)}
                </div>
            </div>
        );
    }
}

export default Menu;