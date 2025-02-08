require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const aiRouter = require('./routes/ai');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/ai', aiRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Zebra AI API running on port ${port}`);
});
