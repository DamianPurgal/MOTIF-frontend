import {Injectable} from '@angular/core';
import {RxStomp} from "@stomp/rx-stomp";
import {map, share} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertWebsocketService {

  constructor(private stomp: RxStomp) {

  }

  getNewAlertSubscription() {
    return this.stomp.watch("/user/" + sessionStorage.getItem('username')!.toLowerCase() + "/queue/alert-added", {Authorization: sessionStorage.getItem('accessToken')!})
      .pipe(
        map(message => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      )
  }

}
