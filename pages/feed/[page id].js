import Router from 'next/dist/next-server/lib/router/router';
import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router'; 
import { Toolbar } from '../../components/toolbar';

export const Feed = ({articles, pageNumber }) => {
 const router = useRouter();

  return (
    <div className='pagecontainer'>
      <Toolbar />
    <div className={styles.main}>
    {articles.map((article, index) => (
      <div key={index} className={styles.post}>
        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
        <p>{article.description}</p>
        {!!article.urlToImage && <img src={article.urlToImage}/>}
      </div>

    ))}
    </div>

<div className={styles.paginator}>

<div
      onClick={() => {
        if (pageNumber > 1 ) {
router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0));
        }
      }
    }
    

>
   Previous Page
   
</div>
  <div>{pageNumber + 1}</div>

  
<div
className={pageNumber === 5 ? styles.disabled : styles.active}
      onClick={() => {
        if (pageNumber < 5) {
router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0));
        }
      }
    }
>
   Next Page
</div>
  </div>

    </div>
  );
  
};

export const getServerSideProps = async pageContext => {
const pageNumber = pageContext.query.page_id;
if (pageNumber || pageNumber < 1 || pageNumber > 5){
  return{
    props: {
      articles: [],
      pageNumber: 1,

    },
  };
}

const apiResponse = await fetch(
  `http://newsapi.org/v2/top-headlines?country=us&apiKey=a8e2c7170b934756b366b94b0253c44d&pageSize=10&page=${pageNumber}`,
  {
    headers:{
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
    },
  },

);

const apiJson = await apiResponse.json();
console.log(apiJson);

const { articles } = apiJson;

return {
  props: {
    articles,
    pageNumber: Number.parseInt(pageNumber)
  }
}
};


    

export default Feed;