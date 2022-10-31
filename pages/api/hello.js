// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product";
import db from "../../utils/db";

const handler = async(req, res) => {
  await db.connect();
  const product = await Product.find()
  await db.disconnect();

  res.status(200).json(product)

}
export default handler;