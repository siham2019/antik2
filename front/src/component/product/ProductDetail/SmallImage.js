import React from 'react'

export const SmallImage = (props) => {
    return (
        <div className={props.active?"border border-5 border-danger img1 mt-2 click":"img1 mt-2 click"} onClick={props.onClick}>
            
            <img  src={props.url} alt="rr"/>

        </div>
    )
}
