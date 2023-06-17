import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../../Metadata";

import { useAlert } from "react-alert";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearUserErrors,
} from "../../actions/authActions";
import { UPDATE_USER_RESET } from "../../reducers/authReducer";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const userId = params.id;

  useEffect(() => {
    console.log(user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      navigate("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5 my-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update User</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_field">Role</label>

              <select
                id="role_field"
                className="form-control"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
