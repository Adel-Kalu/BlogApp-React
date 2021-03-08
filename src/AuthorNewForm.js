import React, { Component } from 'react'

export default class AuthorNewForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            newAuthor : {}
        }
    }

    handleChange= (event) =>{
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedAuthor = {...this.state.newAuthor}
        updatedAuthor[attributeToChange] = newValue
        console.log(updatedAuthor)
        this.setState({
            newAuthor: updatedAuthor
        })

    }

    handleSubmit =(event) =>{
        event.preventDefault()

        this.props.addAuthor(this.state.newAuthor);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                        name="name"
                        type="text"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label>Gender</label>
                        <input
                        name="gender"
                        type="text"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                        name="emailAddress"
                        type="text"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label>DOB</label>
                        <input
                        name="dateofBirth"
                        type="date"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input type="submit" value="Add Author"></input>
                    </div>
                </form>
            </div>
        )
    }
}
