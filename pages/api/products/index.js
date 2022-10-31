import Product from "../../../models/Product";
import db from "../../../utils/db";


const handler = async(req, res) => {
  await db.connect();
  const product = await Product.find()
  await db.disconnect();
  res.status(200)

  res.send(product);

}
export default handler;