import React, { SyntheticEvent } from "react";
import { Detail } from "../models/detail";

class DetailsForm extends React.Component {
  public formEl!: HTMLFormElement | null;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      name: "",
      description: "",
      comment: "",
    } as Detail;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public handleSubmit(): void {
    console.log(this.state);
  }

  public handleChange(e: SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  public onKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      e.preventDefault();
      this.formEl?.submit();
    }
  }

  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit} ref={(el) => (this.formEl = el)}>
        <div className="grid">
          <div className="col-6">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                onKeyDown={this.onKeyDown}
              ></textarea>
            </div>
          </div>
        </div>
        <button className="--secondary">Clear</button>
        <button className="--primary" type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default DetailsForm;
