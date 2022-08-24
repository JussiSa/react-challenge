import React, { FormEvent, MouseEvent, SyntheticEvent, useState } from "react";
import { Detail } from "../models/detail";
import { StorageUtil } from "../utils/storage-util";

const DetailsFormAndTable = () => {
  let detailsForm: HTMLFormElement | null;
  const [detail, setDetail] = useState<Detail>(new Detail());
  const [details, setDetails] = useState<Detail[]>(() => {
    const stored = StorageUtil.getItem("details");
    return stored ? JSON.parse(stored) : [];
  });

  /**
   * Handle form submit
   * @param e
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setDetails((prevState) => {
      return [...prevState, detail];
    });

    storeDetails();
    resetForm();
  }

  /**
   * Handle input change
   * @param e
   */
  function handleChange(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    setDetail((prevState) => {
      return { ...prevState, [name]: value } as any;
    });
  }

  /**
   * Reset form
   * @param e
   */
  function resetForm(e?: MouseEvent<HTMLButtonElement> | undefined) {
    if (e) {
      e.preventDefault();
    }

    if (detailsForm) {
      detailsForm.reset();
    }

    setDetail(new Detail());
  }

  /**
   * Store submitted details to storage
   */
  function storeDetails() {
    if (details && details.length > 0) {
      StorageUtil.setItem("details", JSON.stringify(details));
    }
  }

  /**
   * Delete clicked detail
   * @param index index of detail to be deleted
   */
  function deleteDetail(index: number) {
    setDetails((prevState) => {
      const arr = prevState.splice(index, 1);
      return arr;
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} ref={(el) => (detailsForm = el)}>
        <div className="grid">
          <div className="col-6">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-control">
              <label htmlFor="comment">Comment</label>
              <textarea
                name="comment"
                rows={4}
                id="comment"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <button className="--secondary" onClick={resetForm}>
          Clear
        </button>
        <button
          className="--primary"
          type="submit"
          disabled={detail.name === "" || detail.description === ""}
        >
          Add
        </button>
      </form>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => {
            return (
              <tr key={index}>
                <td>{detail.name}</td>
                <td>{detail.description}</td>
                <th className="--align-right">
                  <button className="--secondary">Details</button>
                  <button
                    className="--danger"
                    onClick={() => deleteDetail(index)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DetailsFormAndTable;
