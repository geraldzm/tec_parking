import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CallAPI } from '../utils/api'
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats-franja',
  templateUrl: './stats-franja.component.html',
  styleUrls: ['./stats-franja.component.css']
})
export class StatsFranjaComponent implements OnInit {

  private document:Document;

  constructor(@Inject(DOCUMENT) document: Document, private router: Router) { 
    this.document = document;
  }

  async ngOnInit(): Promise<void> {

    const graph = this.document.getElementById("graph");
    if (!graph){
      return;
    }
    

    const api = new CallAPI(this.router);
    const data = await api.callAPI({ url:environment.reportWeek });

    if(data.status !== 200) return;

    console.log("franja horaria");
    console.log(data);

    const week = data.response;
    const days = Object.keys(week);


    for(let i = 0; i < 24; i += 0.5) {

      for(let d in days) {
        const day = days[d];

        const child = this.document.createElement("div");
        child.setAttribute("id", "hour");
        const style = `background-color: ${week[day][i+'']['color']}; text-align: center; font-size: 10px;`;

        child.setAttribute('style', style);
        const hour = Math.floor(i);
        const minutes = i > Math.floor(i) ? 30: 0;

        child.innerHTML = hour + ":" + (minutes === 0 ? "00": minutes);
        graph.appendChild(child);

      }

    }

  }
  
  public loadJsScript(renderer: Renderer2, src: string): HTMLScriptElement {
    console.log("hola2");
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    renderer.appendChild(this.document.body, script);
    return script;
  }

}
