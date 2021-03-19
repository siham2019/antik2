import React, { useState } from 'react'

export const Search = (props) => {
    const [keyword, setkeyword] = useState("")

      const s=(e)=>{        props.search(keyword)
      }

    return (
             
            <div className="form-inline sd mr-5 ">
             {props.search?<><input type="text" className="form-control" name="keyword" 
              value={keyword} onChange={(e)=>setkeyword(e.target.value)} 
               placeholder="please enter name of product"/>
              <button type="submit"  className="btn btn-danger ml-1" onClick={s}>s</button></>:""} 
            </div>
     
    )
}
