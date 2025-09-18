// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface VideoFile {
//   name: string;
//   url: string;
//   size: number;
//   lastModified: Date;
//   contentType: string;
//   metadata: Record<string, string>;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class VideoStorageService {
//   private baseUrl = '/.netlify/functions/azure-video-storage';

//   constructor(private http: HttpClient) {}

//   // Get all videos
//   getVideos(): Observable<VideoFile[]> {
//     return this.http.get<VideoFile[]>(`${this.baseUrl}/list`);
//   }

//   // Get specific video info
//   getVideo(name: string): Observable<VideoFile> {
//     return this.http.get<VideoFile>(`${this.baseUrl}`, {
//       params: { name }
//     });
//   }

//   // Get videos for lessons specifically
//   getLessonVideos(): Observable<VideoFile[]> {
//     return this.getVideos().pipe(
//       map(videos => videos.filter(video => 
//         video.metadata?.['category'] === 'lesson' || 
//         video.name.includes('lesson-')
//       ))
//     );
//   }

//   // Get video by lesson step ID
//   getVideoForStep(stepId: string): Observable<VideoFile | null> {
//     return this.getVideos().pipe(
//       map(videos => videos.find(video => 
//         video.metadata?.['stepId'] === stepId || 
//         video.name.includes(stepId)
//       ) || null)
//     );
//   }

//   // Get video URL for streaming
//   getVideoUrl(name: string): string {
//     const storageAccount = 'your-storage-account-name'; // Replace with your storage account
//     return `https://${storageAccount}.blob.core.windows.net/videos/${name}`;
//   }

//   // Check if video is streamable
//   isVideoStreamable(contentType: string): boolean {
//     const streamableTypes = ['video/mp4', 'video/webm', 'video/ogg'];
//     return streamableTypes.includes(contentType);
//   }

//   // Update video metadata
//   updateVideoMetadata(name: string, metadata: Record<string, string>): Observable<any> {
//     return this.http.post(this.baseUrl, { name, metadata });
//   }

//   // Delete video
//   deleteVideo(name: string): Observable<any> {
//     return this.http.delete(this.baseUrl, {
//       params: { name }
//     });
//   }
// }