import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NameCardTemplateService } from '../../services/name-card-template.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent {
  listNameCardTemplates: any = []; // Danh sách card
  isOpenGrapesJs: any = false; // Trạng thái mở GrapesJs
  isLoading: any = false; // Trạng thái loading
  grapesJsEditorUrl: any = ''; // Url GrapesJs

  constructor(
    private nameCardTemplateService: NameCardTemplateService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.NameCardTemplate_GetAll();
  }

  btnOpenGrapesJsEditor(templateId: any) {
    this.isOpenGrapesJs = true;
    this.isLoading = true;
    if (templateId) {
      this.grapesJsEditorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${environment.grapesJsEditorUrl}/${templateId}`
      );
    } else {
      this.grapesJsEditorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${environment.grapesJsEditorUrl}`
      );
    }
  }

  onIframeLoad() {
    this.isLoading = false;
    const iframe = document.querySelector(
      '.full-screen-iframe'
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.style.display = 'block';
    }
  }

  // Hàm lấy danh sách template card
  NameCardTemplate_GetAll() {
    this.nameCardTemplateService.NameCardTemplate_GetAll().subscribe({
      next: (response: any) => {
        if (response.resultCode === 'OK') {
          this.listNameCardTemplates = response.result;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  // Hàm chuyển hướng đến trang chỉnh sửa template card
  btn_EditNameCardTemplate(id: string) {
    this.router.navigate([`/template/${id}`]);
  }

  // Hàm xem chi tiết template card
  btn_NameCardTemplate_GetById(id: string) {
    this.nameCardTemplateService.NameCardTemplate_GetById(id).subscribe({
      next: (response: any) => {
        if (response.resultCode === 'OK') {
          window.open(`${response.result.url}?` + Date.now());
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
