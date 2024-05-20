import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanResultPage } from './scan-result.page';

const routes: Routes = [
  {
    path: '',
    component: ScanResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanResultPageRoutingModule {}
