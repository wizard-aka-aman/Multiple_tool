import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-convert',
  imports: [FormsModule ,CommonModule],
  templateUrl: './convert.component.html',
  styleUrl: './convert.component.css'
})
export class ConvertComponent {
  file: any;
  selectedFile: any;
  private apiKey = 'secret_KrZ9tO4PO9Op17na';
  private docxToPdf = 'https://v2.convertapi.com/convert/docx/to/pdf';
  private PdfToDocx = 'https://v2.convertapi.com/convert/pdf/to/docx';

  isappearwtp: boolean = false;
  isDownloadablewtp: boolean = false;
  isappear: boolean = false;
  isDownloadable: boolean = false;
  downloadUrl: string = "";
  FileName: string = "";
  constructor(private http: HttpClient , private toastr: ToastrService) {
  }

  ConvertFile(ToPdf :boolean){
    const formData = new FormData(); 
    console.log(this.selectedFile);
    if(this.selectedFile == undefined){
    this.toastr.error( "Select One File","Error");
    return;
    }
    formData.append('file', this.selectedFile, this.selectedFile?.name);  

    const url = `${(ToPdf ? this.docxToPdf : this.PdfToDocx)}?Secret=${this.apiKey}`;
    console.log(url);
      this.isappearwtp = true;
    return this.http.post<any>(url, formData).subscribe({
      next : (response)=> {
      console.log(response);
      const file = response?.Files[0];
      const base64 = file?.FileData;
      // Convert base64 to Blob
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters?.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters?.charCodeAt(i); 
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const downloadUrl = URL?.createObjectURL(blob); 
      this.downloadUrl = downloadUrl;
      this.FileName = file?.FileName || 'converted.pdf'
      this.isappearwtp = false;
      this.isappear = false;
      if(ToPdf){
         
      this.isDownloadablewtp = true;
      this.toastr.success("Converted Word to Pdf!" , "Success")
      }else{
         
        this.isDownloadable = true;
        this.toastr.success("Converted Pdf to Word!" , "Success")
      }
      URL.revokeObjectURL(this.downloadUrl);
    },
    error :(err)=>{
      this.isappearwtp = false;
      this.isappear = false;
      if(err?.error?.InvalidParameters?.File == undefined){
        this.isappearwtp = false;
        this.isappear = false;
        this.toastr.error("Error Occur in File" ,"Error")
        return;
      }
      else if (err?.error?.InvalidParameters?.File != undefined){
        this.toastr.error( err?.error?.InvalidParameters?.File,"Error")
        return
      }
      else{
        this.toastr.error( "Select One File","Error")
      }
      
      URL.revokeObjectURL(this.downloadUrl);
    }
    });
  } 
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput?.files && fileInput?.files?.length > 0) {
      this.selectedFile = fileInput?.files[0];
    }
    console.log(this.selectedFile);
    
  }
  download() {
    const link = document.createElement('a');
    link.href = this.downloadUrl;
    link.download = this.FileName || 'converted.pdf';
    link.click();
    URL.revokeObjectURL(this.downloadUrl);
  }

}
