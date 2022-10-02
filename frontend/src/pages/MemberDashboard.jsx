import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BankAccountItem from "../components/BankAccountItem";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";
import {
  getBankAccounts,
  reset,
} from "../features/bankAccounts/bankAccountSlice";

function MemberDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO create bank accounts API and wire react app to it
  const { user } = useSelector((state) => state.auth);
  const bankAccountsTemp = useSelector((state) => state.bankAccounts);

  const { bankAccounts, isLoading, isError, message } = bankAccountsTemp;

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

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Member Dashboard</p>
      </section>

      <section className="content">
        {bankAccounts.length > 0 ? (
          <div className="goals">
            {bankAccounts.length === 1 && (
              <Navigate to={`/member/${bankAccounts[0]._id}`} />
            )}
            {bankAccounts.map((bankAccount) => (
              <BankAccountItem
                role={"member"}
                key={bankAccount._id}
                bankAccount={bankAccount}
              />
            ))}
          </div>
        ) : (
          <h3>There are no bank accounts.</h3>
        )}
      </section>
    </>
  );
}

export default MemberDashboard;
