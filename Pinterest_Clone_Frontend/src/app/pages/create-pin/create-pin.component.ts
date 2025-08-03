import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-create-pin',
  standalone: true,
  imports: [NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.sass'
})
export class CreatePinComponent {
  previewUrl: string | null = null;
  selectedFile: File | null = null;
  pinForm: FormGroup;

  constructor(private fb: FormBuilder, private api: Api) {
    this.pinForm = this.fb.group({
      title: [''],
      description: [''],
      link: [''],
      board: [''],
      tags: [''],
      allow_comments: [true],
      alt_text: [''],
      image: [null]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onPublish() {
    if (!this.selectedFile) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('mimetype', this.selectedFile.type);

    const values = this.pinForm.value;
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('link', values.link);
    formData.append('board', values.board);
    const tagsArray = values.tags.split(',').map((tag: string) => tag.trim());
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('allow_comments', values.allow_comments);
    formData.append('alt_text', values.alt_text);
    formData.append('user_id', '1'); // replace later with actual user

    this.api.createPin(formData).subscribe({
      next: () => alert('Pin created successfully!'),
      error: (err) =>
        alert(`Error: ${err.error?.error || 'Upload failed'}`)
    });
  }
}
