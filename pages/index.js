import React from "react"

const API_ENDPOINT = "nextjs-minimal-todo.vercel.app"

//SSR
export async function getServerSideProps() {
  const apiPath = API_ENDPOINT + "/api/list"
  const res = await fetch("/api/list")
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
    await fetch(new URL("/api/remove?todo=" + todo, API_ENDPOINT))
    fetch(new URL("/api/list", API_ENDPOINT))
      .then((res) => res.json())
      .then((data) => this.setState({ todoList: data }))
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
