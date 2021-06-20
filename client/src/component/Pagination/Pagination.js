import React from 'react';
import './Pagination.css';

const Pagination = ({dogsPerPage, totalDogs, paginate}) => {
    const nroPaginas = [];
    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        nroPaginas.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {nroPaginas.map(nro => (
                    <li key={nro} className="pageitem">
                        <a onClick={()=>paginate(nro)} href="#!" className="pagelink">
                            {nro}
                        </a>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}
export default Pagination;