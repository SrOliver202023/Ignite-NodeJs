import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/interfaces/IDateProvider";
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/interfaces/IMailProvider';
import { IStorageProvider } from "./StorageProvider/Interfaces/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/Implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/Implementations/S3StorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);