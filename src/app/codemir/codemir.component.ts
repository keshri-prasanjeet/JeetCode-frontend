import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CodemirrorComponent, CodemirrorModule} from "@ctrl/ngx-codemirror";


const defaults = {
  markdown:
    '# Heading\n\nSome **bold** and _italic_ text\nBy [Scott Cooper](https://github.com/scttcper)',
  'text/typescript': `const component = {
  name: "@ctrl/ngx-codemirror",
  User: Prasanjeet
  repo: "https://github.com/scttcper/ngx-codemirror"
};
const hello: string = 'world';`,
  'text/x-python':
    `print("Hello, World!")`,
  'text/x-java':
    ``
};
@Component({
  selector: 'app-codemir',
  standalone: true,
  imports: [CommonModule,FormsModule, CodemirrorModule],
  templateUrl: './codemir.component.html',
  styleUrls: ['./codemir.component.scss']
})
export class CodemirComponent {
  readOnly = false;
  mode: keyof typeof defaults = 'markdown';
  options = {
    lineNumbers: true,
    mode: this.mode,
    theme: 'night',
    autoCloseBrackets: true,
    matchBrackets: true
  };

  defaults = defaults;
  @ViewChild('codemirrorComponent') codemirrorComponent!: CodemirrorComponent;
  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  handleChange($event: Event): void {
    console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }

  protected readonly onsubmit = onsubmit;

  submit() {
    const editorContent = this.codemirrorComponent.value;
    console.log(editorContent);
  }
}
