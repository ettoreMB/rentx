import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./Implementations/EtherealMailProvider";
import { SESmailProvider } from "./Implementations/SESMailProvider";


const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESmailProvider)
}


container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);