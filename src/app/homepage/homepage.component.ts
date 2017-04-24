import { Component } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';


import { RequestOptions, Request, Headers, RequestMethod} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

const URL_UPLOAD = 'http://www.mingjing2637.com/KoreFtpApi/api/upload/';
//const URL_UPLOAD = 'hhttp://localhost:16818/api/upload/';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  
  public uploader:FileUploader = new FileUploader({url: URL_UPLOAD});
  
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
    //this.uploader.queue.map(r=>{console.log(r._file)})
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
    //this.uploader.queue.map(r=>{console.log(r._file)})
  }



// Uploader: ------ Local API Bad !!----------------------------------
    filesToUpload: Array<File>;

    constructor() {

        // For makeFileRequest
        this.filesToUpload = [];
    }

    ngOnInit() {

        // For : Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
        }

        const self = this;
        this.uploader.onSuccessItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
            console.log("onSuccessItem " + status, item);
            self.handle(response);
        }

        // this.uploader.onSuccessItem= (item: any, response: any, status: any, headers: any) => {
        //     console.log('Upload complete status->' + status);
        //     console.log('Upload complete header->' + headers);
        //     console.log('Upload complete item->' + item);
        //     console.log(response);// log response
        //     //your logic
        // };
    }

    handle(r) {
        console.info("handler ran", r);
    }

// load All Button - use XMLHttpRequest : -----------------------------------------
    upload() {

        // Old come from input file Dialog
        //this.filesToUpload = <Array<File>> fileInput.target.files;

        // Get file list from uploader.queue
        this.filesToUpload = [];
        this.uploader.queue.map(r=>{ 
            this.filesToUpload.push(r._file);
            console.log("in upload File: " + r.file);
        });

        //this.makeFileRequest("http://localhost:16818/api/upload", [], this.filesToUpload).then((result) => {
        this.makeFileRequest(URL_UPLOAD, [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }    

    // Send File
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            console.log("In makeFileRequest, File array len:" + files.length);
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    // load One Item Button : 
    uploadOneItem(file : File) {

        //console.log("in uploadOneItem File name: " + file.name);
        this.filesToUpload = [];
        this.uploader.queue.map(r=>{ 
            if( r.file.name == file.name ){
                this.filesToUpload.push(r._file);
                r.isSuccess = true;
                r.isUploading = true;
                //r.progress = 1;
            }
        });
        //this.uploader.progress = 1;
        this.makeFileRequest(URL_UPLOAD, [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }   
}





