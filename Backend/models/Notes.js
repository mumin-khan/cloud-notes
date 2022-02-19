const { default: mongoose } = require("mongoose")


const noteSchema = new Schema({
    title :  {
      type : String,
      required : true
    } ,
    description :  {
      type : String,
            
    } ,
    category :  {
      type : String,
      default: 'general'
    } ,
    
  });
module.exports = mongoose.model('notes',noteSchema);