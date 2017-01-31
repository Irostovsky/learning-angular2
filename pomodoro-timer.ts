import { Component, Input, EventEmitter, Output } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'countdown',
  template: '<h1>Time left </h1>'
})
class CountdownComponent {
  @Input() seconds: number;
  intervalId: number;
  @Output() complete: EventEmitter<any> = new EventEmitter();
  @Output() progress: EventEmitter<number> = new EventEmitter();
  constructor(){
    this.intervalId = setInterval(() => this.tick(), 1000)
  }

  private tick(): void{
    if(--this.seconds < 1){
      clearInterval(this.intervalId)
      this.complete.emit(null)
    }
    this.progress.emit(this.seconds)
  }

}

@Component({
  selector: 'pomodoro-timer',
  directives: [CountdownComponent],
  template: `
    <div class="container text-center">
      <img src='assets/img/pomodoro.png' />
      <countdown [seconds]="25"
        (complete)='onCountdownCompleted()'
        #counter>
      </countdown>
      <p>
        <button
          class='btn btn-default'
          (click)="counter.seconds = 25">
          Reset countdown to 25 seconds
        </button>
      </p>
      <strong>{{counter.seconds}}</strong>
      <p *ngIf="counter.seconds < 10">
        Only <strong>{{counter.seconds}}</strong>
      </p>
    </div>
    `
})
class PomodoroTimerComponent{
  onCountdownCompleted(): void{
    alert('Time up!')
  }
}

bootstrap(PomodoroTimerComponent)