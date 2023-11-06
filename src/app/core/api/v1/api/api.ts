export * from './alert.service';
import { AlertService } from './alert.service';
export * from './helpRequest.service';
import { HelpRequestService } from './helpRequest.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [AlertService, HelpRequestService, UserService];
