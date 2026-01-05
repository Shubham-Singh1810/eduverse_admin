import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPasswordServ } from "../../services/authentication.services";
import "./login.css";

function ResetPassword() {
  const navigate = useNavigate();

  // 🔐 Temporary storage for security
  const email = sessionStorage.getItem("resetEmail");
  const otp = sessionStorage.getItem("resetOtp");

  // 🔐 Redirect if accessed directly
  useEffect(() => {
    if (!email || !otp) navigate("/forgot-password");
  }, [email, otp, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = { email, otp, newPassword: values.password };

        const res = await resetPasswordServ(payload);

        toast.success(res?.data?.message || "Password reset successfully");

        // 🔐 Clear sensitive data
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetOtp");

        navigate("/"); // back to login
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to reset password"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="signin-container">
      <div className="signin-card">
        <img src="assets/images/logo.jpeg" alt="Logo" className="sign-logo" />

        <h2>Reset Password</h2>
        <p className="text-muted text-center">
          Enter your new password below
        </p>

        <form onSubmit={formik.handleSubmit}>
          {/* New Password */}
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="New Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="invalid-feedback">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="btn btn-gradient w-100"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
