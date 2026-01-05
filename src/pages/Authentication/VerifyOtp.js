import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  verifyOtpServ,
  resendOtpServ,
} from "../../services/authentication.services";
import "./login.css";

function VerifyOtp() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);

  const email = sessionStorage.getItem("resetEmail");

  /* 🔐 Route protection */
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  /* TIMER */
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formik = useFormik({
    initialValues: { otp: "" },

    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await verifyOtpServ({
          email,
          otp: values.otp,
        });

        if (res?.data?.statusCode === 200) {
          toast.success(res.data.message);
          navigate("/reset-password");
        } else {
          toast.error(res?.data?.message || "Invalid OTP");
        }
      } catch (error) {
        toast.error("OTP verification failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const resendOtp = async () => {
    if (timer > 0) return;

    try {
      await resendOtpServ({ email });
      toast.success("OTP resent");
      setTimer(60);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <img
          src="assets/images/logo.jpeg"
          alt="Logo"
          className="sign-logo"
        />

        <h2>Verify OTP</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength="6"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
            {formik.touched.otp && formik.errors.otp && (
              <small className="text-danger">
                {formik.errors.otp}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-gradient w-100"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-3">
          Didn’t receive OTP?{" "}
          <span
            className={`cursor ${
              timer > 0 ? "text-muted" : "text-primary"
            }`}
            onClick={timer === 0 ? resendOtp : undefined}
          >
            Resend OTP {timer > 0 && `(${timer}s)`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;




// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { verifyOtpServ, resendOtpServ } from "../../services/authentication.services";
// import "./login.css";

// function VerifyOtp() {
//   const navigate = useNavigate();
//   const [timer, setTimer] = useState(60);

//   const email = localStorage.getItem("forgotEmail"); // saved earlier

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (timer === 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   /* ================= FORMIK ================= */
//   const formik = useFormik({
//     initialValues: { otp: "" },

//     validationSchema: Yup.object({
//       otp: Yup.string()
//         .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
//         .required("OTP is required"),
//     }),

//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const res = await verifyOtpServ({
//           email,
//           otp: values.otp,
//         });

//         if (res?.data?.statusCode === 200) {
//           toast.success(res.data.message || "OTP verified");
//           navigate("/reset-password");
//         } else {
//           toast.error(res.data.message || "Invalid OTP");
//         }
//       } catch (error) {
//         toast.error(error?.response?.data?.message || "OTP verification failed");
//       }
//       setSubmitting(false);
//     },
//   });

//   /* ================= RESEND OTP ================= */
//   const resendOtp = async () => {
//     if (timer > 0) return;

//     try {
//       await resendOtpServ({ email });
//       toast.success("OTP resent successfully");
//       setTimer(60);
//     } catch (error) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="signin-container">
//       <div className="signin-card">
//         <img src="assets/images/logo.jpeg" alt="Logo" className="sign-logo" />

//         <h2>Verify OTP</h2>
//         <p className="text-muted text-center">
//           Enter the 6-digit OTP sent to your email
//         </p>

//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-3">
//             <label>OTP</label>
//             <input
//               type="text"
//               name="otp"
//               className={`form-control ${
//                 formik.touched.otp && formik.errors.otp ? "is-invalid" : ""
//               }`}
//               placeholder="Enter OTP"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.otp}
//               maxLength="6"
//             />
//             {formik.touched.otp && formik.errors.otp && (
//               <small className="text-danger">{formik.errors.otp}</small>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="btn btn-gradient w-100"
//             disabled={formik.isSubmitting}
//           >
//             {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         <div className="mt-3 text-center">
//           Didn’t receive OTP?{" "}
//           <span
//             className={`forgot-password cursor ${
//               timer > 0 ? "text-muted" : ""
//             }`}
//             onClick={resendOtp}
//           >
//             Resend OTP {timer > 0 && `(${timer}s)`}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifyOtp;
