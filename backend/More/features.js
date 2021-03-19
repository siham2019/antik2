

class Features {

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

     search(){
        const keyword=this.queryStr.keyword?{
            name:{
              $regex:this.queryStr.keyword,
              $options:"i"
            }
        }:{}
           this.query= this.query.find({...keyword})
        return this;

    }

    
     filter(){
         
        const copy={...this.queryStr};
         
        const out=["limit","keyword","page"]
 
        out.forEach(r=>delete copy[r])


        let s=JSON.stringify(copy)  

          s=s.replace(/\b(gte|gt|lt|lte)\b/g,match=> `$${match}`)
         

        this.query= this.query.find({...JSON.parse(s)}).sort({price:1})
        
        return this;

    }
    page(nbDoc){

      const current=this.queryStr.page || 1;

       const skip= nbDoc*(current-1)

       this.query= this.query.limit(nbDoc).skip(skip)

        return this;
 
      }

}
module.exports=Features