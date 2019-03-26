import { Component, OnInit } from '@angular/core';
import { SentryService } from 'src/services/sentry.service';
import { ppPigpenVersion } from 'src/environments/version';

@Component({
  selector: 'app-footer',
  template: `
  <p data-cy="app-footer" class="footer">
  This site is © {{ year }} CC BY-NC-SA International by Puzzled Pint (Portland, OR, USA).
  Please see our Privacy Policy (coming soon).
  Website build #{{ build }}.
  If you encounter any issues with this site, please <a (click)="errorReport()" style="cursor: pointer">send an error report</a> or
  e-mail webmasters@puzzledpint.org
  </p>
  `,
  styles: [`.footer{
    text-align:center;
    color:#505052;
    background-color:#F0F0F0;
    margin:1px;
    padding:1rem;
  }`]
})

export class FooterComponent implements OnInit {
  public year = new Date().getFullYear().toString();
  public build = ppPigpenVersion.build;

  constructor(private ss: SentryService) {
  }

  public ngOnInit() { }

  public errorReport() {
    this.ss.errorReport();
  }
}
