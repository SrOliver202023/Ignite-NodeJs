"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(req, res) {
    CreateCourseService_1.default.execute({
        educator: "Dany",
        name: "NodeJs",
        duration: 213
    });
    CreateCourseService_1.default.execute({
        educator: "Diego",
        name: "ReactJs",
    });
    return res.status(200).json({ msg: "executed!" });
}
exports.createCourse = createCourse;
;
