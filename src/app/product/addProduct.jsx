"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function AddProduct({ brands }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e) => {
    //e: SyntheticEvent
    e.preventDefault();
    await axios.post("/api/products", {
      title: e.target.title.value,
      price: Number(e.target.price.value),
      brandId: Number(e.target.brand.value),
    });
    e.target.reset();
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                id="title"
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
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
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select className="select select-bordered" id="brand">
                <option value="" disabled>
                  Select a Brand
                </option>
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
