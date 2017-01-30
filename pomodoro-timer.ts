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
  constructor(){
    this.intervalId = setInterval(() => this.tick(), 1000)
  }

  private tick(): void{
    if(--this.seconds < 1){
      clearInterval(this.intervalId)
      this.complete.emit(null)
    }
  }

}

@Component({
  selector: 'pomodoro-timer',
  directives: [CountdownComponent],
  template: `
    <div class="container text-center">
      <img src='assets/img/pomodoro.png' />
      <countdown [seconds]="25"
        (complete)='onCountdownCompleted()'></countdown>
    </div>
    `
})
class PomodoroTimerComponent{
  onCountdownCompleted(): void{
    alert('Time up!')
  }
}

bootstrap(PomodoroTimerComponent)