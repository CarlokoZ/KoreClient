import { Component, AfterContentInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

@Component({
  selector: 'app-filedetail',
  templateUrl: './filedetail.component.html',
  styleUrls: ['./filedetail.component.css']
})
export class FiledetailComponent implements AfterContentInit {

      @Input() myFile: any;


    // For : route.params.subscribe(params => {}
    private sub: any;
    private parameterFile: any;   // Come from Url

  constructor(private route: ActivatedRoute) { }




    ngAfterContentInit() {

        // For pass parameter by link ...
        // this.sub = this.route.params.subscribe(params => {
        //     this.parameterFile = params['file_Obj']; // (+) converts string 'id' to a number

        // var file = this.parameterFile; // FileList object is file, now use _file


        var file = this.myFile; // from Input

            console.log(file);

            // Loop through the FileList and render image files as thumbnails.
            //for (var i = 0, f; f = files[i]; i++) {

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
                })(file);

                // Read in the image file as a data URL.
                reader.readAsDataURL(file);

        //});
    }


    readTextFile(file)
    {

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    console.log(allText);
                }
            }
        }
        rawFile.send(null);
    }

    makeFileRequest(url: string, params: Array<string>, file: File) {
            return new Promise((resolve, reject) => {
                var formData: any = new FormData();
                var xhr = new XMLHttpRequest();

                //console.log("In makeFileRequest, File array len:" + files.length);
                formData.append("uploads[]", file, file.name);
                
                console.log(formData);
            });
      }

}
