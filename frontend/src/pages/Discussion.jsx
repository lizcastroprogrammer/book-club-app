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
      "Must be valid positive currency"
    ),
});

function Deposit({ withdraws = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO create bank accounts API and wire react app to it
  const { user } = useSelector((state) => state.auth);
  const bankAccountsTemp = useSelector((state) => state.bankAccounts);
  const { bankAccounts, isLoading, isError, message } = bankAccountsTemp;
  const [myBalance, setMyBalance] = useState(null);
  const [bankAccountName, setBankAccountName] = useState(null);

  const [{ response, error: fetchError }, requestObj] = useDepositPost({});
  useEffect(() => {
    if (response) {
      setMyBalance(response.balance);
    }
  }, [response]);
  let { bankAccountId } = useParams();
  useEffect(() => {
    if (!isLoading && bankAccountId && bankAccounts) {
      if (bankAccounts.length > 0) {
        const bankAccount = bankAccounts.filter(
          (ba) => ba._id === bankAccountId
        )[0];
        if (bankAccount && bankAccount.user) {
          setMyBalance(bankAccount.balance);
          setBankAccountName(bankAccount.user.name);
        }
      }
    }
  }, [bankAccounts, isLoading, bankAccountId]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBankAccounts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  const loggedInUserIsSameAsBankAccount = user._id === bankAccountId;
  return (
    <>
      <h1>
        {withdraws ? `Withdraw` : `Deposit`}
        {bankAccountName && loggedInUserIsSameAsBankAccount
          ? ``
          : ` for ${bankAccountName}`}
      </h1>
      <p>
        <Link
          to={
            user && user.userInfo && user.userInfo.roles
              ? `/${user.userInfo.roles}`
              : `/${user.userInfo.roles}/${bankAccountId}`
          }
        >
          &lt; Back
        </Link>
      </p>
      <p>
        <span>Current Balance:</span> <span>${myBalance}</span>
      </p>
      <Formik
        initialValues={{ amount: "" }}
        validationSchema={numberValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          requestObj(bankAccountId, withdraws ? -values.amount : values.amount);
          setSubmitting(true);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder={`Amount to ${withdraws ? "withdraw" : "deposit"}`}
              value={values.amount}
              onChange={handleChange}
              className="form-control"
            />
            <LocalError touched={touched.amount} error={errors.amount} />
            {fetchError?.error && <LocalError error={fetchError.error} />}
            &nbsp;
            <button
              className="form-control"
              disabled={isSubmitting}
              type="submit"
            >
              {withdraws ? `Withdraw` : `Deposit`}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Deposit;
