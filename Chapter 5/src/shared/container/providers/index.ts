import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/interfaces/IDateProvider";
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/interfaces/IMailProvider';

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);