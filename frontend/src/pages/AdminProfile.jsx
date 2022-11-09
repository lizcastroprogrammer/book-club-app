import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NewClubMemberForm from "../components/NewClubMemberForm";
import NewClubMemberItem from "../components/NewClubMemberItem";
import Spinner from "../components/Spinner";
import { getBookClubs, reset } from "../features/bookClubs/bookClubSlice";

function AdminProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const bookClubsTemp = useSelector((state) => state.bookClubs);

  const { bookClubs, isLoading } = bookClubsTemp;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBookClubs());

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

      <NewClubMemberForm />

      <section className="content">
        {bookClubs.length > 0 ? (
          <div className="bank-accounts">
            {bookClubs.map((bookClub) => (
              <NewClubMemberItem
                role={"admin"}
                key={bookClub._id}
                bookClub={bookClub}
              />
            ))}
          </div>
        ) : (
          <h3>There are no book clubs.</h3>
        )}
      </section>
    </>
  );
}

export default AdminProfile;
