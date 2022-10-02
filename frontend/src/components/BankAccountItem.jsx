import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteBankAccount } from "../features/bankAccounts/bankAccountSlice";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../utilities";
function BankAccountItem({ bankAccount }) {
  const dispatch = useDispatch();
  console.log("TEST 10 bankAccount=", bankAccount);
  return (
    <div className="bank-account">
      <h1>{bankAccount.user.name}</h1>
      <div>Balance: {currencyFormatter.format(bankAccount.balance)}</div>
      <div>{new Date(bankAccount.createdAt).toLocaleString("en-US")}</div>
      <h2>{bankAccount.text}</h2>
      <button
        onClick={() => dispatch(deleteBankAccount(bankAccount._id))}
        className="close"
      >
        <FaTrashAlt />
      </button>
      &nbsp;
      <Link className="edit" to={`/admin/${bankAccount._id}/deposit`}>
        <FaPlus />
      </Link>
      <Link className="edit" to={`/admin/${bankAccount._id}/withdraw`}>
        <FaMinus />
      </Link>
    </div>
  );
}

export default BankAccountItem;
