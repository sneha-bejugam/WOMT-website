import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: any; // Could be text, JSON, etc.
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  tags: string[];
  createdAt: Date;
}

export interface StoredBlob {
  name: string;
  lastModified: Date;
  size: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonStorageService {
  private baseUrl = '/.netlify/functions/azure-storage';

  constructor(private http: HttpClient) {}

  // List all lessons
  getLessons(): Observable<StoredBlob[]> {
    return this.http.get<StoredBlob[]>(`${this.baseUrl}/list`);
  }

  // Get specific lesson content
  getLesson(name: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}`, {
      params: { name }
    });
  }

  // Upload/save lesson
  saveLesson(lesson: Lesson): Observable<any> {
    const fileName = `${lesson.id}.json`;
    const content = JSON.stringify(lesson, null, 2);
    
    return this.http.post(this.baseUrl, {
      name: fileName,
      content: content,
      contentType: 'application/json'
    });
  }

  // Delete lesson
  deleteLesson(name: string): Observable<any> {
    return this.http.delete(this.baseUrl, {
      params: { name }
    });
  }

  // Upload file (for media content)
  uploadFile(file: File, fileName: string): Observable<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        this.http.post(this.baseUrl, {
          name: fileName,
          content: content,
          contentType: file.type
        }).subscribe(resolve, reject);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }) as any;
  }
}