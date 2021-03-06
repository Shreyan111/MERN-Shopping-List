import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    // state = {
    //     items: [
    //         {
    //             id: uuid(), name: 'Eggs'
    //         },
    //         {
    //             id: uuid(), name: 'Milk'
    //         },
    //         {
    //             id: uuid(), name: 'Steak'
    //         },
    //         {
    //             id: uuid(), name: 'Water'
    //         },
    //     ]
    // }

    render() {
        // const { items } = this.state;
        const { items } = this.props.item;
        return (
            <Container>
                {/* <Button color='dark' style={{ marginBottom: '2rem' }} onClick={() => {
                    const name = prompt('Enter Item');

                    if (name) {
                        this.setState(state => ({
                            items: [...state.items, { id: uuid(), name }]
                        }));
                    }
                }}>
                    Add Item
                </Button> */}

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ? <Button className='remove-btn' color='danger' size='small' onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button> : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);


// onClick={() => {
//     this.setState(state => ({
//         items: state.items.filter(item => item.id != id)
//     }))