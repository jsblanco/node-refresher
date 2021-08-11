import path from 'path';
import express from 'express';

import * as errorController from './controllers/error';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
