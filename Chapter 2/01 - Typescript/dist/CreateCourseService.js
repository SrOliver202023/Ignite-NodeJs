"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCourseService = /** @class */ (function () {
    function CreateCourseService() {
    }
    // (data: interfaceName) || ({name, duration, educator}:interfaceName)
    CreateCourseService.prototype.execute = function (_a) {
        var name = _a.name, _b = _a.duration, duration = _b === void 0 ? 10 : _b, educator = _a.educator;
        console.log({ educator: educator, name: name, duration: duration, });
    };
    return CreateCourseService;
}());
exports.default = new CreateCourseService;
