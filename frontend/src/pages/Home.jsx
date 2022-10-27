import Button from 'react-bootstrap/Button';
import style from '../style/home.css';
// import Posttest from '../components/Post'
function Home() {
  return (
    <>
      <div className="mb-2">
        <Button style={style} className="btn_creaPost" size="lg" href="/add">
        Créer un post
        </Button>
      </div>
      <div>
        <h1 className='last-post'>DERNIER POST</h1>
      </div>
      <div className='last-post-list'>

      </div>
    </>
  );
}

export default Home;