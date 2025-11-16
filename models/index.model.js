import UserModel from "./user.model.js";
import ClassesModel from "./classes.model.js";
import ClassStudentModel from "./class_student.model.js";
// User(Teacher) 1-N Classes
UserModel.hasMany(ClassesModel, {
  foreignKey: 'teacher_id', 
  as: 'classes'     
});

ClassesModel.belongsTo(UserModel, {
  foreignKey: 'teacher_id',  
  as: 'teacher'            
});

// User(Student) N-N Classes through (ClassStudent)
UserModel.belongsToMany(ClassesModel,{
  through: ClassStudentModel,
  foreignKey: 'student_id',
  otherKey: 'class_id',
  as: 'joinedClasses'
});

ClassesModel.belongsToMany(UserModel,{
  through: ClassStudentModel,
  foreignKey: 'class_id',
  otherKey: 'student_id',
  as: 'students'
});


export { UserModel, ClassesModel, ClassStudentModel };