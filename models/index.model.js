import dbConfig from "../config/db.config.js";


import UserModel from "./user.model.js";
import ClassesModel from "./classes.model.js";



UserModel.hasMany(db.ClassesModel, {
  foreignKey: 'teacher_id',
  as: 'taughtClasses' // Các lớp giáo viên dạy
});
ClassesModel.belongsTo(db.UserModel, {
  foreignKey: 'teacher_id',
  as: 'teacher' // Giáo viên của lớp
});


