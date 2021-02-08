import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export default function InvestOpForm({ formValues }) {
  const { register, handleSubmit } = useForm(formValues);

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="form-control">
        <label htmlFor="email">
          Email
          <input id="email" type="text" name="email" ref={register} />
        </label>
      </div> */}
      <input
        className="form-control"
        type="text"
        name="address"
        readOnly
        ref={register}
      />
      <textarea
        className="form-control"
        type="textarea"
        name="description"
        placeholder="Description of Property"
        ref={register}
      />
      <div className="d-flex justify-content-end">
        <button type="submit">Preview</button>
      </div>
    </form>
  );
}

InvestOpForm.propTypes = {
  formValues: PropTypes.shape({
    defaultValues: PropTypes.shape({
      address: PropTypes.string,
    }),
  }).isRequired,
};
