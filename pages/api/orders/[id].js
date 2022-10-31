import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const {id} = req.query
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  await db.connect();

  const order = await Order.findById(id);
  console.log(order);
  await db.disconnect();
  res.send(order);
};

export default handler;
