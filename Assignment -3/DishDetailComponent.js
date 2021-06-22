import React from 'react';
import {Row,Col, Card, CardImg, CardText,CardTitle, Breadcrumb, BreadcrumbItem,Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Modal,ModalHeader,ModalBody,Label} from 'reactstrap';

const RenderDish = (props) => {
    return (

        <Card key={props.dish.id}>
            <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
            <CardTitle>{props.dish.name}</CardTitle>
            <CardText>{props.dish.description}</CardText>
        </Card>
    );
}

const RenderComments = (props) => {
    return (
       <Container fluid>
            <h3>Comments</h3>
            {props.comments.map(e =>
                <Row key={e.id}>
                    <Row>{e.comment}</Row>
                    <Row className="w-100">
                        <Col md="fluid">--{e.author}</Col>
                        <Col>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(e.date)))}</Col>
                    </Row>
                </Row>
            )}<br/>
            <Button outline>
                <span className=""></span>Submit Comments
                <CommentForm />
           </Button>
        </Container>
    );
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component{
    constructor(){
        super();
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }
    handleClick(){
        this.toggleModal();
    }
    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    render(){
        return(
          <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody> 
            <div className="row row-content pt-2">
                   <div className="col">
                   <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                   <Row className="form-group mx-auto">
                   <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" name="rating" className="form-control ">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                   </Row>
                   <Row className="form-group mx-auto">
                        <Label htmlFor="fullname">First Name</Label>
                        <Control.text model=".fullname" id="fullname" name="fullname" placeholder="Full Name" className="form-control" 
                                     validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                     }}/>
                        <Errors
                        className="text-danger"
                        model=".fullname"
                        show="touched"
                        messages={{
                            required: 'The filed cannot be left empty. ',
                            minLength: 'Name must be greater than 2 characters. ',
                            maxLength: 'Name must be 15 characters or less. '
                        }}
                        />
                    </Row>
                   <Row className="form-group mx-auto">
                        <Label htmlFor="message">Your Feedback</Label>
                        <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control" />
                    </Row>
                   <Row className="form-group mx-auto">
                        <Button type="submit" color="primary">
                            Send Feedback
                        </Button>
                    </Row>
                   </LocalForm>
                   </div>
            </div>
            </ModalBody>
            </Modal>
            <Button className="mx-auto mt-3" onClick={this.handleClick}><i className="fa fa-pencil mr-1" />Submit Comment</Button>
          </React.Fragment>
        );
    }
}


const DishDetail = (props) =>{   

    if(props.dish != null){
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active><Link to="/menu">{props.dish.name}</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} dishID={props.dish.id} />
                </div>
            </div>
            </div>
        );
    } else return <div></div>
}
export default DishDetail;

/*<CommentForm /> */
//import CommentForm from './CommentForm';