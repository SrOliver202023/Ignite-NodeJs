import { Request, Response, Router } from 'express';
import CreateCourseService from './CreateCourseService';

export function createCourse(req:Request, res:Response) {

  CreateCourseService.execute({
    educator: "Dany",
    name: "NodeJs",
    duration: 213
  });

  CreateCourseService.execute({
    educator: "Diego",
    name: "ReactJs",
  });

  return res.status(200).json({ msg: "executed!"})
};