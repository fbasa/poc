import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Job, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, name: 'user11', dob: new Date(), email: 'test11@gmail.com', gender:'male', hourlyRate: 10 },
      { id: 12, name: 'user12', dob: new Date(), email: 'test12@gmail.com', gender:'female', hourlyRate: 15 },
    ];
    const jobs = [
      { id: 13, title: 'job 13', description: 'job 13 test' },
      { id: 14, title: 'job 14', description: 'job 14 test' },
    ];
    return {users, jobs};
  }

  userId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
  
  jobId(jobs: Job[]): number {
    return jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 11;
  }
}