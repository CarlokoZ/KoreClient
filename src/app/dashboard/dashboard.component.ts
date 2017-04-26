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

  private myText : any;  

  constructor(_dataService: DataService,
              private location: Location,
              private http: Http
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

// Good Picture :   if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
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


// Good Text : 
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

// PDF : 
    handleFileSelectPDF(event) {

        let files = event.target;
    }
}



// This code simply inserts an image that was read from disk into a page. Since the data URI contains all of the image data, 
// it can be passed directly into the src attribute of an image and displayed on the page. 
// You could, alternately, load the image and draw it onto a <canvas> as well:

// var reader = new FileReader();
// reader.onload = function(event) {
//     var dataUri = event.target.result,
//         context = document.getElementById("mycanvas").getContext("2d"),
//         img     = new Image();

//     // wait until the image has been fully processed
//     img.onload = function() {
//         context.drawImage(img, 100, 100);
//     };
//     img.src = dataUri;
// };

// reader.onerror = function(event) {
//     console.error("File could not be read! Code " + event.target.error.code);
// };

// reader.readAsDataURL(file);