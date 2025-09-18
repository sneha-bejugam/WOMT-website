import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// This interface describes the video file object returned by our serverless function.
export interface VideoFile {
  name: string;
  url: string; // This will be the publicly accessible URL for streaming
  size: number;
  lastModified: Date;
  contentType: string;
  metadata: Record<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class VideoStorageService {
  // This is the endpoint for your Netlify Function that communicates with Azure.
  private baseUrl = '/.netlify/functions/azure-video-storage';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of all available video files.
   * @returns An Observable array of video files.
   */
  getVideos(): Observable<VideoFile[]> {
    return this.http.get<VideoFile[]>(`${this.baseUrl}?action=list`);
  }

  /**
   * Retrieves metadata for a single video by its name.
   * @param name - The blob name of the video (e.g., 'lesson-1-intro.mp4').
   * @returns An Observable of a single video file's data.
   */
  getVideo(name: string): Observable<VideoFile> {
    return this.http.get<VideoFile>(`${this.baseUrl}?action=get&name=${name}`);
  }

  /**
   * A helper method to get a video associated with a specific lesson step ID.
   * It checks the video's metadata for a 'stepId' tag.
   * @param stepId - The unique ID of the lesson step.
   * @returns An Observable of the matching video file or null if not found.
   */
  getVideoForStep(stepId: string): Observable<VideoFile | null> {
    return this.getVideos().pipe(
      map(videos => videos.find(video => video.metadata?.['stepId'] === stepId) || null)
    );
  }

  /**
   * Checks if a video's content type is suitable for browser streaming.
   * @param contentType - The MIME type of the video.
   * @returns True if the video format is streamable.
   */
  isVideoStreamable(contentType: string): boolean {
    const streamableTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    return streamableTypes.includes(contentType);
  }
}