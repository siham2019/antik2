import React from 'react'
import Pagination from "react-js-pagination";

export const MPagination = (props) => {
    return (
        <div className=" mt-3 mb-5  pag">
              <Pagination
          activePage={props.activePage}
          itemsCountPerPage={2}
          totalItemsCount={props.count}
          itemClass="px-3 border border-1 "
          activeClass=" bg-primary"
          activeLinkClass="text-light"
          onChange={props.pageit}
        />
        </div>
    )
}
