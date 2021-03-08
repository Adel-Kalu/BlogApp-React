import React, { Component } from 'react'

export default class Author extends Component {
    render() {
        return (
            <li>
                {this.props.name}
                <button onClick={()=>{this.props.deleteAuthor(this.props.id)}}>Delete</button>
                <button onClick={()=>{this.props.editView(this.props.id)}}>Edit</button>
            </li>
        )
    }
}
