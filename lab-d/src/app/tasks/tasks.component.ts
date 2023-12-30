import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TasksService} from "../tasks.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  public newTask: Task = {};
  public isProcessing = false;

  constructor(
    private taskService: TasksService
  ) {
  }

  ngOnInit() {
    this.taskService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.isProcessing = false;
  }

  addTask() {
    if (this.newTask.title === undefined) {
      return;
    }

    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasks.unshift(this.newTask); // optimistic update; try commenting this line off and compare the difference

    this.taskService.post(this.newTask).subscribe((task) => {
      this.newTask = {};
      this.ngOnInit();
    });
  }

  handleChange(task: Task) {
    this.taskService.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveCompleted() {
    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }

      task.archived = true;
      observables.push(this.taskService.put(task));
    }

    // refresh page when all updates finished
    forkJoin(observables).subscribe(() => {
      this.ngOnInit();
    });
  }
}
