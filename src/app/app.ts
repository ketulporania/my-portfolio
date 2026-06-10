import { Component } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Skills } from './features/skills/skills';
import { Experience } from "./features/experience/experience";
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Home,
    About,
    Skills,
    Experience,
    Projects,
    Contact
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}