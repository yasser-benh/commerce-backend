import Product from "../models/product.model";

export const addProduct = async (sellerId: string, name: string, price: number, description: string) => {
  const product = new Product({ name, price, description, seller: sellerId });
  await product.save();
  return product;
};

export const editProduct = async (sellerId: string, productId: string, name?: string, price?: number, description?: string) => {
  const product = await Product.findOne({ _id: productId, seller: sellerId });
  if (!product) throw new Error('Product not found or unauthorized');

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  await product.save();

  return product;
};

export const deleteProduct = async (sellerId: string, productId: string) => {
  const product = await Product.findOneAndDelete({ _id: productId, seller: sellerId });
  if (!product) throw new Error('Product not found or unauthorized');
  return product;
};