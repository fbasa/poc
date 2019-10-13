import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobService } from 'src/app/services';
import { Job } from 'src/app/models';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { of } from 'rxjs';
import { switchMap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'poc-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends BaseComponent implements OnInit, OnDestroy {

  jobs: Job[] = [];
  job: Job = null;
  cols: any[];
  selectedJob: Job;
  displayDialog: boolean;
  newJob: boolean;

  constructor(
    private jobService: JobService
    ){
      super();
      this.cols = [
        { field: 'title', header: 'Title' },
        { field: 'description', header: 'Description' },
      ];
    }

  ngOnInit(){
    this.getJobs();
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  getJobs(){
    this.jobService.getJobs()
    .subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  showDialogToAdd() {
    this.newJob = true;
    this.job = this.newJobData();
    this.displayDialog = true;
  }

  saveJob() {
    of(this.newJob)
    .pipe(
      switchMap(ifNew => ifNew 
        ? this.jobService.addJob(this.job) 
        : this.jobService.updateJob(this.job)),
      flatMap(p => this.jobService.getJobs())
    ).subscribe(jobs => {
      this.jobs = jobs;
      this.displayDialog = false;
    })
  }

  deleteJob() {
    this.jobService
    .deleteJob(this.selectedJob.id)
    .pipe(
      flatMap(u => this.jobService.getJobs())
    ).subscribe(jobs => {
      this.displayDialog = false;
      this.jobs = jobs;
    });
  }

  onRowSelect(event) {
    this.newJob = false;
    this.job = this.cloneJob(event.data);
    this.displayDialog = true;
  }

  cloneJob(j: Job): Job {
    let job = this.newJobData();
    for (let prop in j) {
      job[prop] = j[prop];
    }
    return job;
  }

  newJobData(): Job {
    return {
      id: 0,
      title: '',
      description: '',
    };
  }

}
