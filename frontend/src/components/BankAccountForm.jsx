import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBankAccount } from "../features/bankAccounts/bankAccountSlice";
import { getUsers } from "../features/users/userSlice";

function BankAccountForm() {
  const [balance, setBalance] = useState("");
  const { users } = useSelector((state) => state.users);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createBankAccount({ balance, userId }));
    setBalance("");
  };

  const handleOnChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="balance">Select user</label>
          <select
            value={userId}
            className="form-select"
            aria-label="Default select example"
            onChange={handleOnChange}
          >
            <option value={undefined}></option>
            {users.map((user) => (
              <option selected={user} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="balance">Balance</label>
          <input
            type="text"
            name="balance"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Bank Account
          </button>
        </div>
      </form>
    </section>
  );
}

export default BankAccountForm;
