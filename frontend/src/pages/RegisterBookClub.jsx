import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { bookClubRegister, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    virtual: false,
    inperson: false,
  });

  const { name, location, virtual, inperson } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      //TODO: navigate to admin profile instead of member?
      navigate("/member");
      toast.success("Registration successful");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (password !== password2) {
    //   toast.error("Passwords do not match");
    // } else {
    const bookClubData = {
      name,
      location,
      virtual,
      inperson,
    };

    dispatch(bookClubRegister(bookClubData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create a book club</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter book club name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              placeholder="Enter book club location"
              onChange={onChange}
            />
          </div>
          <input
            type="checkbox"
            id="virtual"
            name="virtual"
            value={virtual}
            onChange={onChange}
          />
          <label for="virtual">Virtual</label>
          <input
            type="checkbox"
            id="inperson"
            name="inperson"
            value={inperson}
            onChange={onChange}
          />
          <label for="inperson"> In-person </label>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
