import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';

export function createCourse(req:Request, res:Response){
    CreateCourseService.execute({
        name:"NodeJS",
        duration:10, 
        educator:"Dani" 
    });
    CreateCourseService.execute({
        name:"ReactJS",
        educator:"Diego Fernandes" 
    });
    return res.send();
}