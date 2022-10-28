import Button from 'react-bootstrap/Button';
import Thread from '../components/Thread';
import style from '../style/home.css';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
            <Navbar />
      <div className="mb-2">
        <Button style={style} className="btn_creaPost" size="lg" href="/add">

        Créer un post
        </Button>
      </div>
      <Thread/>
    </>
  );
}

export default Home;