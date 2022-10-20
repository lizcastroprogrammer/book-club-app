import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BankAccountForm from "../components/BankAccountForm";
import BankAccountItem from "../components/BankAccountItem";
import Spinner from "../components/Spinner";
import {
  getBankAccounts,
  reset,
} from "../features/bankAccounts/bankAccountSlice";

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO create bank accounts API and wire react app to it
  const { user } = useSelector((state) => state.auth);
  const bankAccountsTemp = useSelector((state) => state.bankAccounts);

  const { bankAccounts, isLoading } = bankAccountsTemp;

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
        <p>Admin Dashboard</p>
      </section>

      <BankAccountForm />

      <section className="content">
        {bankAccounts.length > 0 ? (
          <div className="bank-accounts">
            {bankAccounts.map((bankAccount) => (
              <BankAccountItem
                role={"admin"}
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

export default Search;
