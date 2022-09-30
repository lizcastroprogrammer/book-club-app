import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import LocalError from "../components/LocalError";
import {
  getBankAccounts,
  reset,
} from "../features/bankAccounts/bankAccountSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDepositPost } from "../hooks/useDepositPost";

const numberValidation = Yup.object().shape({
  amount: Yup.string()
    .required("Must be valid currency")
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Must be valid currency"
    ),
});

function Deposit() {
  console.log("TEST rendering Deposit");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO create bank accounts API and wire react app to it
  const { user } = useSelector((state) => state.auth);
  const bankAccountsTemp = useSelector((state) => state.bankAccounts);

  console.log("TEST 10 bankAccountsTemp: ", bankAccountsTemp);

  const { bankAccounts, isLoading, isError, message } = bankAccountsTemp;
  let { bankAccountId } = useParams();
  //   const [{ data, error, loading }, doFetch] = useDepositPost();
  console.log("TEST 11 bankAccountsTemp: ", bankAccountsTemp);
  const depositResponse = useDepositPost();
  console.log("TEST depositResponse=", depositResponse);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    console.log("TEST get all bank accounts");
    dispatch(getBankAccounts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  console.log("TEST 4");
  if (isLoading) {
    return <Spinner />;
  }
  console.log("TEST 5");
  return (
    <>
      <h1>Deposit</h1>
      <p>
        <Link to={`/admin/${bankAccountId}`}>&lt; Back</Link>
      </p>
      <Formik
        initialValues={{ amount: "" }}
        validationSchema={numberValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          depositResponse[1](values);
          setSubmitting(true);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Amount to deposit"
              value={values.amount}
              onChange={handleChange}
              className="form-control"
            />
            <LocalError touched={touched.amount} error={errors.amount} />
            &nbsp;
            <button
              className="form-control"
              disabled={isSubmitting}
              type="submit"
            >
              Deposit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Deposit;
