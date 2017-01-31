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
        (progress)='timeout = $event'
        (complete)='onCountdownCompleted()'>
      </countdown>
      <strong>{{timeout}}</strong>
      <p *ngIf="timeout < 10">
        Only <strong>{{timeout}}</strong>
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