/**
 * name - string 
 * duration - number
 * educator - string
 */
interface iCourse{
  name:string, 
  duration?:number, 
  educator:string
}

class CreateCourseService {
  // (data: interfaceName) || ({name, duration, educator}:interfaceName)
  execute({name, duration = 10, educator}: iCourse){
    console.log({educator, name, duration, });
  }
}

export default new CreateCourseService;