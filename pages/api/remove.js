import { UPSTASH_AUTH, UPSTASH_ENDPOINT } from "../../lib/upstash_url"

//add a todo
export default async (req, res) => {
  if (!req.query.todo) {
    return res.status(400).send("todo parameter required.")
  }
  let todo = encodeURI(req.query.todo)
  const url = UPSTASH_ENDPOINT + "/lrem/todo/0/" + todo
  return fetch(url, {
    headers: {
      Authorization: UPSTASH_AUTH,
    },
  })
    .then((r) => r.json())
    .then((data) => {
      let result = JSON.stringify(data.result)
      return res.status(200).json(result)
    })
}
