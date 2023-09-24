import style from './Paginador.module.css'
import Card from '../Card/Card'
import { connect, useDispatch } from "react-redux";

import { useEffect} from 'react';
import { nextHandler, prevHandler, firstRender } from '../../redux/actions';

function Paginador ({dogs, home, currentPage, showing, nextHandler, prevHandler}) {  

    const itemsPerPage = 8;

    const dispatch = useDispatch()
  
    useEffect (() => {
        dispatch(firstRender(dogs, itemsPerPage));
      }, [dogs])

      const prev = () => {
        dispatch(prevHandler(dogs, itemsPerPage, currentPage))
      }

      const next = () => {
        dispatch(nextHandler(dogs, itemsPerPage, currentPage))
      }

    let items = [];

        items = showing.map ((dog) => {
            return (
                    <li key={dog.id} className={style.FlexLi}>
                        <Card 
                            image={dog.reference_image_id} 
                            name={dog.name} 
                            temperament={dog.temperament} 
                            weight={dog.weight.metric} 
                            id={dog.id}>
                        </Card>
                    </li>
            )
        })

            return (
                <div>
                    <h2>Pagina {currentPage+1}</h2>
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                    <ul className={style.FlexContainer}>{items}</ul>
                </div>
            )
}


const mapStateToProps = (state) => {
    return {
        dogs: state.dogs,
        showing: state.showing,
        currentPage: state.currentPage,
    }
 }
 
 function mapDispatchToProps (dispatch){
    return {
       nextHandler: (dogs, itemsPerPage, currentPage) => dispatch(nextHandler(dogs, itemsPerPage, currentPage)),
       prevHandler: (dogs, itemsPerPage, currentPage) => dispatch(prevHandler(dogs, itemsPerPage, currentPage)),
    }
 }
 
 export default connect (mapStateToProps, mapDispatchToProps)(Paginador);