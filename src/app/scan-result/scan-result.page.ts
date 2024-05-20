import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning'
import { AlertController } from '@ionic/angular'
import { HttpService } from '../services/http.service'
import { Preferences } from '@capacitor/preferences'
import { Toast } from '@capacitor/toast';
import { HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.page.html',
  styleUrls: ['./scan-result.page.scss']
})
export class ScanResultPage implements OnInit {
  noResult = true
  isLoading = true
  driver = ""
  postal_code = ""
  isSupported = false
  organisation = ""

  constructor( private route: Router, private alertController: AlertController, private httpService: HttpService,) { }

  ngOnInit() {
    //this.getOrganisation()
    this.organisation = "app.tiramizoo.com"
    BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then((isAvailable) => {
      if(isAvailable) {
        BarcodeScanner.installGoogleBarcodeScannerModule().then((installed) => {

        });
      }
    })

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported
      this.scan()
    })
  }

  getOrganisation() {
     Preferences.get({key:'organisation'}).then((result) => {
        console.log(result.value)
        this.organisation = result.value!
    })
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    await this.getOrderData(barcodes.pop()!.rawValue)
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions()
    return camera === 'granted' || camera === 'limited'
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present()
  }

  async getOrderData(code: String) {
    this.isLoading = true
    console.log("code " + code)
    this.httpService.doPost('https://tiramizoo-sorting-app-wjjudczu.herokuapp.com/api/scannings', this.organisation, code)
        .subscribe(
            (res: HttpResponse) => {
              // Toast.show({
              //   text: res.data,
              // });
              this.isLoading = false
              if (res.status == 200 || res.status == 201) {
                if(res.data != "" && res.data != null ){
                  this.noResult = false
                  this.driver = res.data['courier_name']!
                  this.postal_code = res.data['delivery_postal_code']!
                } else {
                  this.noResult = true
                }
              } else {
                this.noResult = true
              }
            })
  }

  async close(): Promise<void> {
    this.route.navigateByUrl('/home', { replaceUrl: true })
  }

  async scanAgain(): Promise<void> {
   // this.scan()
    this.getOrderData("123456")
  }
}
