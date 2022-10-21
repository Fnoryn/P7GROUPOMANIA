
    import style from '../style/publication.css';
    import Posttest from '../components/Post'
function Publication (){
      return (
        <>
          <div className="mb-2" style={style}>
            <div className="publi-post">
                Post publié
            </div>
            
          </div>
          <div className='post-list'>
            <Posttest />
            <Posttest />
            <Posttest />
            <Posttest />
            <Posttest />
          </div>
        </>
      );
    }

export default Publication