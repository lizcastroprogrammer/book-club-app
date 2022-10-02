import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import {
  getBankAccounts,
  reset,
} from "../features/bankAccounts/bankAccountSlice";
import { currencyFormatter } from "../utilities";

function ControlPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO create bank accounts API and wire react app to it
  const { user } = useSelector((state) => state.auth);
  const bankAccountsTemp = useSelector((state) => state.bankAccounts);

  console.log("bankAccountsTemp: ", bankAccountsTemp);

  const { bankAccounts, isLoading } = bankAccountsTemp;
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
      <h1>Welcome back {user.userInfo && user.userInfo.name + ","}</h1>
      {bankAccounts && bankAccounts.length === 1 && (
        <p>
          <span>Current Balance:&nbsp;</span>
          <span>{currencyFormatter.format(bankAccounts[0].balance)}</span>
        </p>
      )}

      <p>
        <Link to={`/member/${bankAccountId}/deposit`}>Deposit</Link>
      </p>
      <p>
        <Link to={`/member/${bankAccountId}/withdraw`}>Withdraw</Link>
      </p>
    </>
  );
}

export default ControlPanel;
