import React from 'react'

function AddProduct({type}) {
  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form">
        <span className="title">Add Product</span>
        <span className="subtitle">People will be able to buy it after you {type} the product</span>

        <div className="form-container">
          <input type="text" className="input mb-5" placeholder="Title" />
          <input type="text" className="input mb-5" placeholder="Description" />
          <input type="number" className="input mb-5" placeholder="Price" />
          <span className="subtitle mb-3">Add the photo for the product</span>
          <input type="file" className="input mb-5" placeholder="Photo" />
        </div>

        <button type="submit">{type}</button>
      </form>

    </div>
    </div>
  )
}

export default AddProduct
