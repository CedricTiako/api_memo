const Memos = require('./Memos')


//findById(id)
exports.getMemos = (req, res) => {

    var query = ""
    if(req.query.s)  query=req.query.s
   
  Memos.find({centiment: {$regex: query, $options: "$i"}}).exec().then((result) =>{
      res.status(200).json({
          count: result.length,
          data: result
      })
  }).catch(error =>{
      console.log(error)
      res.status(500).json({
          error
      })
  })
}

//Ajout d'Memos
exports.addMemos =  (req, res) =>{
    const timestamp = Date.now();
    let sampleFile;
    let uploadPath;
    // timestamp in milliseconds
     console.log(timestamp);
    var memo = new Memos({
        centiment:req.body.centiment,
        durer:req.body.durer,
        vocal:req.body.vocal,
        video:req.body.video
    })  
    try {
        console.log(memo);

        if(req.files.vocal!=null)
        {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.vocal;
            sampleFile.name='audio_'+timestamp+'.mp3';
            uploadPath = __dirname + '/uploads/' + sampleFile.name;
            memo.vocal=sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
            });
        }
        if(req.files.video!=null)
        {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.video;
            sampleFile.name='videos_'+ timestamp+'.mp3';
            memo.video=sampleFile.name;
            uploadPath = __dirname + '/uploads/' + sampleFile.name;

            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
            });   
        }
    //    upload(req,res,timestamp.toString());
        memo.save().then((result)=>{
            res.status(201).json({
                message:'Cration réussie',
                data: result
            })
        })
    
    } catch (error) {
        
    }

}

//Pour retourner un seul Memo
exports.getMemo =  (req, res) => {
    const id = req.params.id
    if(id.length != 24) return res.status(400).json({
        message: 'id invalid'
    })
    Memos.findById(id).exec().then(result => {
        res.status(200).json({
            message:'Memo retrouvé',
            data :result
        })
    }).catch(error =>{
        console.log(error)
        res.status(500).json({
            error
        })
    })
}
//update

exports.updateMemo =  (req, res) => {
    const id = req.params.id
    if(id.length != 24) return res.status(400).json({
        message: 'id invalid'
    })
    let memo = {}
    if(req.body.centiment) memo.centiment=req.body.centiment
    if(req.body.durer) memo.durer=req.body.durer
    if(req.body.vocal)  memo.vocal=req.body.vocal
    if(req.body.video)  memo.video=req.body.video
 
    Memos.update({_id:id}, {$set:memo}).exec().then(result => {
        res.status(200).json({
            message : 'succes',
            data : result
        })

    }).catch(error =>{
        console.log(error)
        res.status(500).json({
            error
        })
    })
}

exports.deleteMemo =  (req, res) => {
    const id = req.params.id
    if(id.length != 24) return res.status(400).json({
        message: 'id invalid'
    })
    

    Memos.remove({_id:id}).exec().then(result => {
        res.status(200).json({
            message : 'succes',
            data : result
        })

    }).catch(error =>{
        console.log(error)
        res.status(500).json({
            error
        })
    })
}


 function uploadMulti (req, res) {
    // Uploaded files:
    console.log(typeof req.files.files)

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    req.files.files.forEach(file => {
        sampleFile = file.file
        uploadPath = __dirname + "/uploads/" + file.name

        file.mv(uploadPath,(err) => {
            if (err)
            return res.status(500).send(err);
        })
    });

    res.send("All files uploaded")
};

function upload(req, res,title) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    sampleFile.name=title+'.jpg';
    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
};