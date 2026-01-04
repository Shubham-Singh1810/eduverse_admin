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
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await forgotPasswordServ(values);

        if (response?.data?.statusCode === 200) {
          toast.success(response.data.message);

          // Save email for next step
          localStorage.setItem("resetEmail", values.email);

          navigate("/verify-otp");
        } else {
          toast.error(response?.data?.message);
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
        <p className="text-muted text-center mb-3">
          Enter your registered email to receive OTP
        </p>

        <form onSubmit={formik.handleSubmit}>
          {/* EMAIL */}
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
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

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-gradient w-100"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>

          {/* BACK TO LOGIN */}
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
