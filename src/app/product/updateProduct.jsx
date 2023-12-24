"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function UpdateProduct({ brands, product }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleUpdate = async (e) => {
    //e: SyntheticEvent
    e.preventDefault();
    await axios.patch(`/api/products/${product.id}`, {
      title: e.target.title.value,
      price: Number(e.target.price.value),
      brandId: Number(e.target.brand.value),
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {product.title}</h3>
          <form onSubmit={(e) => handleUpdate(e)}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                id="title"
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                defaultValue={product.title}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
                defaultValue={product.price}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
                id="brand"
                defaultValue={product.brandId}
              >
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
