import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Welcome to the Book Club App</h1>
        <p>We offer the best options for all your book-loving needs</p>
        <Link to="/start-book-club">
          <button>Start Book Club</button>
        </Link>
        <Link to="/join-book-club">
        <button>Join Book Club</button>
        </Link>
      </section>
    </>
  );
}

export default Home;
