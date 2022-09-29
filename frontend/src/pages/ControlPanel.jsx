import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import {
  getBankAccounts,
  reset,
} from "../features/bankAccounts/bankAccountSlice";

function ControlPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO create bank accounts API and wire react app to it
  const { user } = useSelector((state) => state.auth);
  const bankAccountsTemp = useSelector((state) => state.bankAccounts);

  console.log("bankAccountsTemp: ", bankAccountsTemp);

  const { bankAccounts, isLoading, isError, message } = bankAccountsTemp;
  let { bankAccountId } = useParams();

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Control Panel</h1>
      <p>
        <Link to={`/admin/`}>&lt; Back</Link>
      </p>
      <Link to={`/admin/${bankAccountId}/deposit`}>Deposit</Link>
    </>
  );
}

export default ControlPanel;
