const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname) || '.png';
    const baseName = path.basename(file.originalname, extension).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${baseName}-${Date.now()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

const resolveUploadedImagePath = (req) => {
  if (req.file?.filename) {
    return `/uploads/${req.file.filename}`;
  }

  if (typeof req.body?.image === 'string' && req.body.image.trim()) {
    return req.body.image;
  }

  return null;
};

module.exports = { upload, resolveUploadedImagePath };
