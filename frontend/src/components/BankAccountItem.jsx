import {
  FaDollarSign,
  FaMinus,
  FaPencilAlt,
  FaPlus,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteBankAccount } from "../features/bankAccounts/bankAccountSlice";
import { Link } from "react-router-dom";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function BankAccountItem({ bankAccount }) {
  const dispatch = useDispatch();
  console.log("TEST 10 bankAccount=", bankAccount);
  return (
    <div className="bank-account">
      <h1>{bankAccount.user.name}</h1>
      <div>Balance: {formatter.format(bankAccount.balance)}</div>
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
