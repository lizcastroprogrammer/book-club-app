import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewClubMemberItem({ bookClub, role = "member" }) {
  return (
    <div className="bank-account">
      <h1>{bookClub.user.name}</h1>
      <div>Book Club Name</div>
      <div>{new Date(bookClub.createdAt).toLocaleString("en-US")}</div>
      <h2>{bookClub.text}</h2>
      <Link className="edit" to={`/${role}/${bookClub._id}/deposit`}>
        <FaPlus />
      </Link>
      <Link className="edit" to={`/${role}/${bookClub._id}/withdraw`}>
        <FaMinus />
      </Link>
    </div>
  );
}

export default NewClubMemberItem;
