import PostAdd from '../components/Post/PostAdd';
import Thread from '../components/Thread';
import style from '../style/home.css';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mainContent" style={style}>
          <div className="postAdd" >
            <PostAdd />
          </div>
          <div className="thread">
            <Thread/>
          </div>
      </div>
    </>
  );
}

export default Home;