import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";


const Home = () => {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
        </div>
      </div>
    );
  };
  
  export default Home;