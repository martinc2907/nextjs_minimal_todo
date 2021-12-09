import redis from "lib/redis"

//get list of todos
export default async (req, res) => {
    res.status(200).json({ name: 'John Doe' })

}
