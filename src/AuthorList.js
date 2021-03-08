import React, { Component } from 'react';
import axios from 'axios';
import Author from './Author';
import AuthorNewForm from './AuthorNewForm';
import AuthorEditForm from './AuthorEditForm';

export default class AuthorList extends Component {
    constructor(props){
        super(props);
        this.state = {
            authors: [],
            isEdit: false,
            clickedAuthorId : ''
        }
    }

    componentDidMount(){
        this.loadAuthorList();
    }

    loadAuthorList = () => {
        axios.get("/blogapp/author/index")
        .then(response =>{
            console.log(response)
            this.setState({
                authors: response.data
            })
        })
        .catch(error =>{
            console.log("Error retreiving Authors !!");
            console.log(error);
        })
    }

    loadArticlesList = (author) => {
         if(author.articles.length){
            const articles =  author.articles.map((item, key) => (
                <li key={key}> {item.title} </li>
            ));
        return articles;
        }
    }

    addAuthor = (author) =>{
        axios.post("/blogapp/author/add", author, 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                console.log("Added!!")
                // const updatedAuthorsList = [...this.state.authors];
                // updatedAuthorsList.push(response.data);
                // this.setState({
                //     authors: updatedAuthorsList
                // })
                this.loadAuthorList();
            })
            .catch(error =>{
                console.log("Error Adding Author");
                console.log(error)
            })
    }

    deleteAuthor= (id) =>{
        axios.delete(`/blogapp/author/delete?id=${id}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                console.log("Deleted!")
                // const updatedAuthorsList = [...this.state.authors];
                // const index = updatedAuthorsList.findIndex(x => x.id === id);

                // if(index !== -1){
                //     updatedAuthorsList.splice(index, 1) 

                //     this.setState({
                //         authors: updatedAuthorsList
                //     })
                // }
                this.loadAuthorList();
            })
            .catch(error =>{
                console.log("Error Deleting Author!")
                console.log(error)
            })
    }

    editView =(id) =>{
        this.setState({
            isEdit: !this.state.isEdit,
            clickedAuthorId: id
        })
    }

    editAuthor = (author) =>{
        axios.put("/blogapp/author/edit", author, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response =>{
                console.log("Edited!!")
                console.log(response);
                this.loadAuthorList();
            })
            .catch(error =>{
                console.log("Error Editing author");
                console.log(error)
            })
    }


    render() {
        return (
            <div>
                {(!this.state.isEdit) ?    <AuthorNewForm addAuthor={this.addAuthor} /> : null}
                <h1>Authors List</h1>
                <ul>
                    {this.state.authors.map((author, index) =>
                    <div  key={index}>

                    <Author {...author} deleteAuthor ={this.deleteAuthor} editView={this.editView}/>
                    {(this.state.isEdit && this.state.clickedAuthorId === author.id) ? <AuthorEditForm  author={author} editAuthor={this.editAuthor}/> : null}
                    {this.loadArticlesList(author)}
                    <hr />
                   
                    </div>)}
                    
                </ul>
            </div>
        )
    }
}
