import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteBankAccount } from "../features/bankAccounts/bankAccountSlice";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../utilities";
function BankAccountItem({ bankAccount, role = "member" }) {
  const dispatch = useDispatch();
  return (
    <div className="bank-account">
      <h1>{bankAccount.user.name}</h1>
      <div>Balance: {currencyFormatter.format(bankAccount.balance)}</div>
      <div>{new Date(bankAccount.createdAt).toLocaleString("en-US")}</div>
      <h2>{bankAccount.text}</h2>
      <Link className="edit" to={`/${role}/${bankAccount._id}/deposit`}>
        <FaPlus />
      </Link>
      <Link className="edit" to={`/${role}/${bankAccount._id}/withdraw`}>
        <FaMinus />
      </Link>
    </div>
  );
}

export default BankAccountItem;
