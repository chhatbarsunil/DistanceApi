// const express = require('express');
// const express=require('express')
// const router=express.Router()
// const mongoose = require('mongoose');
import express from 'express';
import  './config/db.js';
import routes from './routes/routes.js';
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
