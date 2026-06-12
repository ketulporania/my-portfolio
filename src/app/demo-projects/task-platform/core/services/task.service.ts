export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  assigneeIds: string[];
  dueDate: string;
  createdAt: string;
  order: number;
  tenantId: string;
  commentCount: number;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
  tenantId: string;
  memberIds: string[];
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/data/tp-tasks.json');
  }

  loadProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/data/tp-projects.json');
  }
}
