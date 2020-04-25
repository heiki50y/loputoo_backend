const express = require('express');
const router = express.Router();

const {
    uploadDoc,
    createDocuments,
    getAllDocuments,
    getDocument,
    deleteDocument
} = require('../controller/documents.controller');

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .post(protect, uploadDoc, createDocuments)
    .get(protect, getAllDocuments)

router
    .route('/:id')
    .get(protect, getDocument)
    .delete(protect, deleteDocument)

module.exports = router;