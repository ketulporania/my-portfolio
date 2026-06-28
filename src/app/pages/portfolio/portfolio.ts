import { Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Home } from '../../features/home/home';
import { About } from '../../features/about/about';
import { Skills } from '../../features/skills/skills';
import { Experience } from '../../features/experience/experience';
import { Projects } from '../../features/projects/projects';
import { Contact } from '../../features/contact/contact';

@Component({
  selector: 'app-portfolio',
  imports: [Navbar, Home, About, Skills, Experience, Projects, Contact],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {}
