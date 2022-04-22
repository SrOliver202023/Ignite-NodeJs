import { container } from "tsyringe";

import { IDateProvider } from "./interfaces/IDateProvider";
import { DayjsDateProvider } from './implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

