import Head from "next/head"
import Image from "next/image"
import path, { resolve } from "path"
import React from "react"
import styles from "../styles/Home.module.css"

const API_ENDPOINT = "http://localhost:3000"

//SSR
export async function getServerSideProps() {
  const apiPath = "http://localhost:3000/api/list"
  const res = await fetch(apiPath)
  const list = await res.json()
  return {
    props: {
      list,
    },
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: props.todoList,
      formValue: "",
    }
  }

  addTodo = async (event) => {
    const todo = this.state.formValue
    event.preventDefault()
    this.setState({ formValue: "" })
    await fetch(new URL("/api/add?todo=" + todo, API_ENDPOINT))
    fetch(new URL("/api/list", API_ENDPOINT))
      .then((res) => res.json())
      .then((data) => this.setState({ todoList: data }))
  }

  clearTodo = async (event) => {
    const url = new URL("/api/clear", API_ENDPOINT)
    await fetch(url)
    this.setState({ todoList: [] })
  }

  handleFormInputChange = (event) => {
    this.setState({ formValue: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Todo list</h1>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Enter your exciting todo item!"
            value={this.state.formValue}
            onChange={this.handleFormInputChange}
          />
        </form>
        <button onClick={this.clearTodo}>clear</button>
        <ul>
          {this.state.todoList.map((todo) => (
            <li>{todo}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default function Home({ list }) {
  return <TodoList todoList={list}></TodoList>
}
