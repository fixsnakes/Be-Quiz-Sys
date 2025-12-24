import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tạo thư mục uploads nếu chưa có
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Tạo tên file unique: timestamp + random + extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `exam-${uniqueSuffix}${ext}`);
    }
});

// Filter chỉ cho phép file ảnh
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload file ảnh (jpeg, jpg, png, gif, webp)'));
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: fileFilter
});

// Controller để upload ảnh
export const uploadExamImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ 
                message: 'Không có file được upload' 
            });
        }

        // Trả về URL của ảnh đã upload
        const imageUrl = `/uploads/${req.file.filename}`;
        
        return res.status(200).send({
            message: 'Upload ảnh thành công',
            image_url: imageUrl,
            filename: req.file.filename
        });

    } catch (error) {
        return res.status(500).send({ 
            message: error.message || 'Lỗi khi upload ảnh' 
        });
    }
};

