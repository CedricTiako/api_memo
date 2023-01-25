const mongoose = require('mongoose');
const schema= mongoose.Schema;
const MemosSchema = new schema({
    centiment:{
        type: String,
        required:false,
    },
    durer:{
        type:Number,
        required:true,
    },
    vocal:{
        type:String,
        require:false,
        default:null
    },
    video:{
        type: String,
        default:null,
        require:false,
    }
})

//Pour recuperer mon model créer plus haut
let  Memos = mongoose.model('Memos', MemosSchema)
module.exports = Memos