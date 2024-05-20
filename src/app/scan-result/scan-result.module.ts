import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanResultPageRoutingModule } from './scan-result-routing.module';

import { ScanResultPage } from './scan-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanResultPageRoutingModule
  ],
  declarations: [ScanResultPage]
})
export class ScanResultPageModule {}
