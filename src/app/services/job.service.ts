import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Job } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobService extends BaseService {

  private jobsUrl = 'api/jobs';  

  constructor(
    private http: HttpClient
    ) {
      super();
   }

   getJobs() : Observable<Job[]> {
     return this.http.get<Job[]>(this.jobsUrl)
      .pipe(
        catchError(this.handleError<Job[]>('getJobs', []))
      );
   }

   updateJob(job: Job): Observable<Job> {
    const url = `${this.jobsUrl}/${job.id}`;
    return this.http.put<Job>(url, job, this.httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError<Job>('updateJob', job))
      );
  }

  addJob(job: Job): Observable<Job> {
    job.id = null;
    return this.http.post<Job>(this.jobsUrl, job, this.httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError<Job>('addJob',job))
      );
  }

  deleteJob (id: number): Observable<Job> {
    const url = `${this.jobsUrl}/${id}`;
    return this.http.delete<Job>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<Job>('deleteJob', null))
    );
  }   
}
