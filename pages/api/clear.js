import { UPSTASH_AUTH, UPSTASH_ENDPOINT } from "../../lib/upstash_url"

//get list of todos
export default async (req, res) => {
  const url = UPSTASH_ENDPOINT + "/flushdb"
  return fetch(url, {
    headers: {
      Authorization: UPSTASH_AUTH,
    },
  })
    .then((r) => {
      return r.json()
    })
    .then((data) => {
      let result = JSON.stringify(data.result)
      return res.status(200).json(result)
    })
}
