import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async(req, res) => { 
  const {id} = req.query
  await db.connect();
  const product = await Product.findOne(id)
  res.send(product)
}
export default handler;