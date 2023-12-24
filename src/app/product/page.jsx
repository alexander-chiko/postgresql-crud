import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";
const prisma = new PrismaClient();

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brand: true,
      brandId: true,
    },
  });
  const brands = await prisma.brand.findMany();

  // const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  return (
    <div>
      <div className="mb-2">
        <AddProduct brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td>
                <DeleteProduct product={product} />
                <UpdateProduct brands={brands} product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
