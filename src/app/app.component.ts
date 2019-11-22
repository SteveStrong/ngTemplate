import { Component, OnInit } from '@angular/core';

import { EmitterService, Toast } from './shared/emitter.service';

import { ConfigService } from './config.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngtemplate';
  hasConfig = false;

  constructor(
    private configService: ConfigService
  ) {
  }

  openToast(type, title, message) {

    const options = {
      toastLife: 3000,
      showCloseButton: true,
      tapToDismiss: true,
      enableHTML: true,
      autoDismiss: false,
      dismiss: 'click',
      newestOnTop: true,
      positionClass: 'toast-bottom-left' //// "toast-bottom-right"  toast-top-full-width
    };

    // setTimeout( _ => {
    //   this.toastr[type](title, message, options);
    // }, 10);
 }

  ngOnInit() {

    EmitterService.displayToast(this, this.openToast);

    this.configService.getConfig().subscribe((data: any) => {
      const host = window.location.hostname;

      Object.keys(data).forEach(key => {
        environment[key] = data[key];
        //console.log(environment[key]);
      });

      this.hasConfig = true;
      Toast.info('services are connected', 'services config');
    });
  }

}
