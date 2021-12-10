import { UPSTASH_AUTH, UPSTASH_ENDPOINT } from "../../lib/upstash_url"

//get list of todos
export default async (req, res) => {
  const url = UPSTASH_ENDPOINT + "/lrange/todo/0/100"
  const response = await fetch(url, {
    headers: { Authorization: UPSTASH_AUTH },
  })
  const json = await response.json()
  const dataString = JSON.stringify(json.result)
  return res.status(200).json(dataString)
}
