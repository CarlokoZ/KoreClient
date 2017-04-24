import { Component } from '@angular/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  date = new Date();

  public name:string = 'File Upload';
  public currentHeading:string = 'Simple';
  // public doc:string = doc;
  //public tabs:any = tabDesc;

  public select(e:any):void {
    if (e.heading) {
      this.currentHeading = e.heading;

      console.log(this.currentHeading);
    }
  }
}
