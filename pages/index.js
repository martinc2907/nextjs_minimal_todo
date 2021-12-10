import Head from "next/head"
import Image from "next/image"
import path, { resolve } from "path"
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

function addTodo(todo) {
  const url = new URL("/api/add?todo=" + todo, API_ENDPOINT)
  fetch(url)
}

export default function Home({ list }) {
  return (
    <div>
      <h1>TODO App with Next.js!</h1>
      <form onsubmit={addTodo("hi")}>
        <input type="text" placeholder="Enter your exciting TODO item!" />
      </form>
      <ul>
        {list.map((todo) => (
          <li>todo</li>
        ))}
      </ul>
    </div>
  )
}
