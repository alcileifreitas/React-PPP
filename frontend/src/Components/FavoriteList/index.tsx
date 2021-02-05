import React  from 'react';
import FavoriteStyle from './styles';

type FavoriteListProps = {
    title: string,
    title2: string,
}

const FavoriteList: React.FC<Partial<FavoriteListProps>> = (props) => {

    return(
        <>
        <FavoriteStyle>
        <hr/>
            <div>
                <h1>{props.title}</h1>
                {props.children}
            </div>
        <hr className='allMovies'/>
            <h1>{props.title2}</h1>
        </FavoriteStyle>
        </>
    )

}

export default FavoriteList;