import { Component, OnInit } from '@angular/core';
import { DataService }  from '../data-service.service';
import { FileItem }     from '../models/defineClass';
import { Location }     from '@angular/common';
import { Http, Response } from '@angular/http';

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
              private http: Http
  ) {
      this.dataService = _dataService;

      // Listen to click events in the component
        // renderer.listenGlobal('files', 'change', (evt) => {
    //     renderer.listen ('files', 'change', (evt) => {
            
    //         // Do something with 'event'
    //         var files = evt.target.files; // FileList object

    //         console.log(files);

    //             // Loop through the FileList and render image files as thumbnails.
    //             for (var i = 0, f; f = files[i]; i++) {

    //             // Only process image files.
    //             //if (!f.type.match('image.*')) {
    //             //  continue;
    //             //}

    //             var reader = new FileReader();

    //             // Closure to capture the file information.
    //             reader.onload = (function(theFile) {
    //                 return function(e) {
    //                 // Render thumbnail.
    //                 var span = document.createElement('span');
    //                 span.innerHTML = ['<img class="thumb" src="', e.target.result,
    //                                     '" title="', theFile.name, '"/>'].join('');
    //                 document.getElementById('list').insertBefore(span, null);
    //                 };
    //             })(f);

    //             // Read in the image file as a data URL.
    //             reader.readAsDataURL(f);
    //             }
    // })
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

// Good Picture
    handleFileSelect(evt) {

        var files = evt.target.files; // FileList object

        console.log(files);

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        //if (!f.type.match('image.*')) {
        //  continue;
        //}

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                '" title="', (theFile.name), '"/>'].join('');
            document.getElementById('list').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
  }

    myText;

    handleFileSelectCSV(event) {

       let input = event.target;

        console.log(input.files);
       
    for (var index = 0; index < input.files.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
            this.myText = reader.result.split("\n");
            console.log(this.myText);
        }
        reader.readAsText(input.files[index]);
    };
  }
  
}