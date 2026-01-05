import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPasswordServ } from "../../services/authentication.services";
import "./login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await forgotPasswordServ(values);

        if (res?.data?.statusCode === 200) {
          toast.success(res.data.message);

          // 🔐 secure temp storage
          sessionStorage.setItem("resetEmail", values.email);

          navigate("/verify-otp");
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to send OTP"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="signin-container">
      <div className="signin-card">
        <img
          src="assets/images/logo.jpeg"
          alt="Logo"
          className="sign-logo"
        />

        <h2>Forgot Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">
                {formik.errors.email}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-gradient w-100"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className="text-center mt-3">
            <span
              className="cursor text-primary"
              onClick={() => navigate("/")}
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
