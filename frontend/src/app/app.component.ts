import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MutantService } from './mutant.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [MutantService],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pulseAnimation', [
      transition('* => *', [
        animate('0.6s', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.05)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('cellHighlight', [
      transition('* => *', [
        animate('0.3s ease-in-out', keyframes([
          style({ backgroundColor: '#fff3cd', offset: 0 }),
          style({ backgroundColor: 'transparent', offset: 1 })
        ]))
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  matrixSize: number = 6;
  dnaMatrix: string[] = [];
  result: any = null;
  isLoading = false;
  visualizationMatrix: string[][] = [];
  animationTrigger = 0;

  constructor(private mutantService: MutantService) {
    this.generateMatrix();
  }

  generateMatrix(): void {
    this.dnaMatrix = new Array(this.matrixSize).fill('');
    this.result = null;
    this.visualizationMatrix = [];
  }

  validateInput(index: number, event: any): void {
    const value = event.target.value.toUpperCase();
    const validValue = value.replace(/[^ATCG]/g, '');
    this.dnaMatrix[index] = validValue.slice(0, this.matrixSize);
    event.target.value = this.dnaMatrix[index];
  }

  isValidSequence(sequence: string): boolean {
    if (!sequence) return false;
    return /^[ATCG]*$/.test(sequence) && sequence.length === this.matrixSize;
  }

  isValidMatrix(): boolean {
    return this.dnaMatrix.every(row => this.isValidSequence(row));
  }

  getPlaceholder(index: number): string {
    const examples = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
    return examples[index % examples.length].slice(0, this.matrixSize);
  }

  loadExample(): void {
    if (this.matrixSize === 6) {
      this.dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
    } else if (this.matrixSize === 4) {
      this.dnaMatrix = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];
    } else {
      // Para otros tamaños, generar un ejemplo básico
      this.generateRandom();
      // Asegurar al menos una secuencia mutante
      this.dnaMatrix[0] = 'A'.repeat(this.matrixSize);
      this.dnaMatrix[1] = 'T'.repeat(this.matrixSize);
    }
  }

  generateRandom(): void {
    const bases = ['A', 'T', 'C', 'G'];
    this.dnaMatrix = Array.from({ length: this.matrixSize }, () => 
      Array.from({ length: this.matrixSize }, () => 
        bases[Math.floor(Math.random() * bases.length)]
      ).join('')
    );
  }

  clearMatrix(): void {
    this.generateMatrix();
  }

  createVisualization(): void {
    this.visualizationMatrix = this.dnaMatrix.map(row => row.split(''));
  }

  getBaseClass(base: string): string {
    const classes: { [key: string]: string } = {
      'A': 'base-a',
      'T': 'base-t',
      'C': 'base-c',
      'G': 'base-g'
    };
    return classes[base] || '';
  }

  analyzeDNA(): void {
    if (!this.isValidMatrix()) return;

    this.isLoading = true;
    this.result = null;
    this.animationTrigger++;

    this.mutantService.checkMutant(this.dnaMatrix).subscribe({
      next: (response) => {
        this.result = response;
        this.createVisualization();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.result = {
          isMutant: false,
          message: 'Error al analizar el ADN. Verifica tu conexión.'
        };
        this.isLoading = false;
      }
    });
  }
}