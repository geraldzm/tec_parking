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

    // // reportWeek
    // const data = await callAPI({ url:environment.reportWeek });

    // if(data.status === 200) {
    //   console.log("data: " + JSON.stringify(data))
    //   return;
    // }
      
    // const colors = ["red", "yellow", "yellowgreen", "green"];

    // for (var h = 0; h < 24; h++) {
    //     const childDay = this.document.createElement("div");
    //     childDay.setAttribute("id", "day");
    //     for (var d = 0; d < 7; d++) {
    //         const child = this.document.createElement("div");
    //         child.setAttribute("id", "hour");
    //         child.setAttribute("class", "grid-item");
    //         console.log(colors[Math.floor(Math.random() * colors.length)]);
    //         child.setAttribute('style', `background-color: ${colors[Math.floor(Math.random() * colors.length)]}`);
    //         child.innerHTML = h+"";
    //         graph.appendChild(child);
    //     }
    // }

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
