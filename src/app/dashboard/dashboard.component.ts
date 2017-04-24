import { Component, OnInit } from '@angular/core';
import { DataService }  from '../data-service.service';
import { FileItem }     from '../models/defineClass';
import { Location }     from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dataService: DataService;
  private fileItemsList: Array<FileItem>;

  constructor(_dataService: DataService,
              private location: Location,
  ) {
      this.dataService = _dataService;
   }

  ngOnInit() {
      this.getFilesList();
  }

 private getFilesList() {
      this.dataService.getFileListFromWebApi()
      // Subscribe to observable.
        .subscribe(
            // Success.
            data => {
                console.log(data);
                //this.myProducts = data.sort(data.cat_id);
                this.fileItemsList = data;
            },
            // Error.
            error => {
                alert(error)
            },
            // Final instructions.
            () => {
                console.log("Finished")
            });
    }

    // Send File
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {

        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("GET", url, true);
            //xhr.send(formData);   ？？？？？？
            xhr.send();
        });
    }

    goBack(): void {
        this.location.back();
    }    
    
    refresh(): void {
        this.getFilesList();
    }
}
