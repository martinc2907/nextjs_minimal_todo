import React from "react"
import { env } from "../next.config"

//SSR
export async function getServerSideProps() {
  const res = await fetch(`${process.env.ROOT}/api/list`)
  console.log(res)
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

  removeTodo = async (todo) => {
    await fetch("/api/remove?todo=" + todo)
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => this.setState({ todoList: data }))
  }

  addTodo = async (event) => {
    const todo = this.state.formValue
    event.preventDefault()
    this.setState({ formValue: "" })
    await fetch("/api/add?todo=" + todo)
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => this.setState({ todoList: data }))
  }

  clearTodo = async (event) => {
    await fetch("/api/clear")
    this.setState({ todoList: [] })
  }

  handleFormInputChange = (event) => {
    this.setState({ formValue: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Todo list using plain react </h1>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Enter your exciting todo item!"
            value={this.state.formValue}
            onChange={this.handleFormInputChange}
          />
        </form>
        <br></br>
        <button onClick={this.clearTodo}>clear entire list</button>
        <ul>
          {this.state.todoList.map((todo, idx) => (
            <li key={idx}>
              <div>
                {todo + " "}
                <button
                  onClick={() => {
                    this.removeTodo(todo)
                  }}
                >
                  remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default function Home({ list }) {
  return <TodoList todoList={list}></TodoList>
}
