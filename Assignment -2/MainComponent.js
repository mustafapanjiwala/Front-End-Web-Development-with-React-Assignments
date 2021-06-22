import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dott from './Dott';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect } from 'react-router-dom';
import '../Assets/boot/css/bootstrap.min.css';


class Main extends Component {

  constructor(props)
  {
    super(props);

    this.state={
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    }; 
  }

  onDishSelect(dishId)
  {
      this.setState({ SelectedDish :dishId });
  }

  render()
  {
    const HomePage=()=>{
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
         />
      );
    }

    const DishWithID=({match})=>{
      return(
        <Dott dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10)[0])} 
        comments={this.state.comments.filter((comments)=>Comment.dishId===parseInt(match.params.dishId,10)[0])}
        />
      );
    }

  return (
    <div className="App">
        <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Route path="/menu/:dishID" component={DishWithID} />
            <Route exact path="/contactus" component={Contact} />
            <Route exact path="/aboutus" component={()=><About leaders={this.state.leaders} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
    </div>
  );
  }
}

export default Main;