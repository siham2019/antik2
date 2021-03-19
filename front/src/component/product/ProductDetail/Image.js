import React, { useEffect, useState } from 'react'
import { SmallImage } from './SmallImage'

export const Image = (props) => {
    
    const [images, setimages] = useState()

useEffect(() => {

   if(props.image){
    const i=props.image
    
     i.forEach(image=>{
          
        image.active=false

     })
     
     i[0].active=true
     setglobalImage(i[0].url)
     setimages(i)
   }
   
}, [])


      const ChangeGlobal=(i)=>{

        setglobalImage(images[i].url)
        const imageCopy=images;
        imageCopy.forEach(image=>{
            image.active=false
        })
        imageCopy[i].active=true

        setimages(imageCopy)

      }

    const [globalImage, setglobalImage] = useState("")
    return (
        <div className="d-flex">
        <div className="mr-3 mt-3  im">
            {
                images?.map((image,index)=>  <SmallImage key={index}
                active={image.active} onClick={()=>ChangeGlobal(index)} url={image.url}/>)
            }
               
        </div>
       <div className="img ">
           {/* big image */}
       <img className="w-100 " src={globalImage} alt="rr"/>

       </div>
   </div>
    )
}
