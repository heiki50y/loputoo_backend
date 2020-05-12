const multer = require('multer');
const moment = require('moment');
const fs = require('fs')
const Documents = require('../models/Documents');

const date = moment().format("DD.MM.YYYY--HH.mm.ss")

const deleteFile = (filetPath) => {
    fs.unlink(filetPath, (err) => {
        if (err) {
            throw (err);
        }
    })
}

const docsStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/dokumendid');
    },
    filename: (req, file, cb) => {
        cb(null, date + '-' + file.originalname)
    }
})

const upload = multer({storage: docsStorage})

exports.uploadDoc = upload.single('doc');

exports.createDocuments = async (req, res, next) => {
    try {
        const { docName, docType, group } = req.body

        const doc = req.file.originalname
        const docFix = doc.slice(0, doc.length-4);
        const path = 'dokumendid/' + date + '-' + req.file.originalname

        
        const docs = await Documents.create({
            doc: docFix,
            docName,
            docType,
            path,
            group
        });

        res.status(201).json(docs);
        
    } catch (err) {
        next(err)
    }
}

exports.getAllDocuments = async (req, res, next) => {
    try {
        const docs = await Documents.find();

        res.status(201).json(docs);

    } catch (err) {
        next(err)   
    }
}

exports.getDocument = async (req, res, next) => {
    try {
        const doc = await Documents.findById(req.params.id);

        if (!doc) return res.status(404).json({ msg: 'Dokumenti ei leitud' });

        res.status(201).json(doc);

    } catch (err) {
        next(err)
    }
}

exports.deleteDocument = async (req, res, next) => {
    try {
        const doc = await Documents.findById(req.params.id);

        if (!doc) return res.status(404).json({ msg: 'Dokumenti ei leitud' });

        deleteFile('public/' + doc.path)

        await doc.remove();

        res.status(200).json({ success: true });
        
    } catch (err) {
        next(err)
    }
}