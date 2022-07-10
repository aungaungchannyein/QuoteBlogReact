import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch} from "react-router-dom";
import useHttp from '../components/hooks/use-http';
import { getSingleQuote } from '../components/lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const QuoteDetail = () =>{
    const param = useParams();
    const match = useRouteMatch();

    const {quoteId} = param;

    const {sendRequest, status, data: loadedQuote, error} =useHttp(getSingleQuote,true);



   useEffect(() =>{
    sendRequest(quoteId)
   },[sendRequest,quoteId]);

   if(status === 'pending'){
    return(
        <div className='centered'>
            <LoadingSpinner/>
        </div>);
   }

   if(error){
    return <p className='centered'>{error}</p>;
   }

    if(!loadedQuote.text){
        return<p>No quote found!</p>
    }
    return(
        <Fragment>
            <h1>Quote Detail Page</h1>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`/quotes/${param.quoteId}`} exact>
            <div className='centered'>
                <Link className='btn--flat' to={`${match.url}/comments`}>
                    Load Comments
                </Link>
            </div>
            </Route>
            

            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
        )
};

export default QuoteDetail;