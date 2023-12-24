"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function DeleteProduct({ product }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = async (id) => {
    //e: SyntheticEvent
    await axios.delete(`/api/products/${id}`);
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure want to delete Product {product.title}
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            <button
              type="button"
              onClick={() => handleDelete(product.id)}
              className="btn btn-primary"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
