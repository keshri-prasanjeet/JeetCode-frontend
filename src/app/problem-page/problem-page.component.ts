import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AdminService} from "../services/admin.service";
import {Problem} from "../classes/problem";
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CodemirrorComponent, CodemirrorModule} from "@ctrl/ngx-codemirror";
import {languages, modes, themes} from "./modeAndTheme";
import {SkeletonComponent} from "../skeleton/skeleton.component";
import {LoadingService} from "../loading.service";
import {Observable} from "rxjs";

const defaults = modes;
const cmThemes = themes;
const langs = languages

@Component({
  selector: 'app-problem-page',
  standalone: true,
  imports: [
    RouterLink,
    CodemirrorModule,
    CommonModule,
    FormsModule,
    SkeletonComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.scss']
})
export class ProblemPageComponent implements OnInit, AfterViewInit {

  isLoading$: Observable<boolean>;
  readOnly = false;
  mode: keyof typeof defaults = 'text/typescript';
  theme: keyof typeof cmThemes = 'night';
  // language: keyof typeof langs = 'text/typescript';
  language = 74;
  options = {
    lineNumbers: true,
    mode: this.mode,
    theme: this.theme,
    autoCloseBrackets: true,
    matchBrackets: true,
  };

  defaults = defaults;
  @ViewChild('codemirrorComponent') codemirrorComponent!: CodemirrorComponent;
  @ViewChild('exampleTestCase') exampleTestCaseDiv!: ElementRef;
  @ViewChild('hiddenTestCase1') hiddenTestCase1!: ElementRef;
  @ViewChild('hiddenTestCase2') hiddenTestCase2!: ElementRef;
  submitInProg: boolean = false;
  runInProg: boolean = false;

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
    this.language = langs[this.mode];
    //console.log(this.language + " is the language selected")
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };
  }


  handleChange($event: Event): void {
    //console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }

  protected readonly onsubmit = onsubmit;

  submit() {
    const editorContent = this.codemirrorComponent.value;
    //console.log(editorContent);
  }

  problemData: Problem = new Problem();
  problemId: number = 0;
  username: string = '';
  successfulRun: boolean = false;
  successfulSubmit: boolean = false;


  Substatus: string = '';
  stdin: string = '';
  output: string = '';
  time: string = '';
  memory: string = '';
  languageId: string = '';

  SubSubStatus: string = '';
  subTime: string = '';
  subMemory: string = '';
  divToManipulate: string = '';

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private loadingService: LoadingService,
  ) {
    this.isLoading$ = this.loadingService.getComponentLoading$('problemData');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params => {
      // console.log("just before")
      // console.log(params);
      this.problemId = this.route.snapshot.params['problemId'];
      //console.log(this.problemId);
    }));
    this.getProblemData();
  }

  getLanguage() {
    this.adminService.getLanguages().subscribe({
      next: (response: any) => {
        // //console.log(response);
      }
    });
  }

  getProblemData() {
    //console.log("the problem id that will be sent to service is " + this.problemId);
    this.loadingService.setComponentLoading('problemData', true);
    this.adminService.getProblemData(this.problemId).subscribe({
      next: (response: any) => {
        if (typeof response === "string") {
          console.error('Error fetching problem data', response);
        } else {
          this.problemData.problemId = response.problemData.problemId;
          this.problemData.title = response.problemData.title;
          this.problemData.difficulty = response.problemData.difficulty;
          this.problemData.acceptance = response.problemData.acceptance;
          this.problemData.description = response.problemData.description;
          this.problemData.exampleIn = response.problemData.exampleIn;
          this.problemData.exampleOut = response.problemData.exampleOut;
          this.problemData.example2_in = response.problemData.example2_in;
          this.problemData.example2_out = response.problemData.example2_out;
          this.problemData.example3_in = response.problemData.example3_in;
          this.problemData.example3_out = response.problemData.example3_out;
          this.username = response.username;
          this.loadingService.setComponentLoading('problemData', false);
        }
      },
      error: (error) => {
        console.error('Error fetching problems data:', error);
        this.loadingService.setComponentLoading('problemData', false);
      },
    });
  }

  runCode() {
    this.runInProg = true;
    this.successfulSubmit = false;
    const editorContent = this.codemirrorComponent.value;
    this.adminService.runCode(this.language, this.problemData.exampleIn, this.problemData.exampleOut, editorContent).subscribe({
      next: (response: any) => {
        if (response.body && response.body.token) {
          this.checkSubmission(response.body.token);
        }
      }
    });
  }

  checkSubmission(token: string) {
    // console.log("token", token);
    this.adminService.submitToken(token).subscribe({
      next: (result: any) => {
        if (result && result.body) {
          if (result.body.status.id == 2 || result.body.status.id == 1) {
            setTimeout(() => {
              this.checkSubmission(token);
            }, 1000);
          } else {
            this.runInProg = false;
            this.successfulRun = true;
            this.Substatus = result.body.status.description;
            this.stdin = result.body.stdin;
            this.output = result.body.stdout;
            this.time = result.body.time;
            this.memory = result.body.memory;
            this.languageId = result.body.language.name;
            setTimeout(() => {
              this.exampleTestCaseDiv.nativeElement.style.color = result.body.status.id !== 3 ? "red" : "green";
            });
          }
        }
      }
    });
  }

  submitCode() {
    this.submitInProg = true;
    this.successfulRun = false;
    const editorContent = this.codemirrorComponent.value;
    this.adminService.runCode(this.language, this.problemData.example2_in, this.problemData.example2_out, editorContent).subscribe({
      next: (response2: any) => {
        if (response2 && response2.body) {
          this.checkSubmitSubmission(response2.body.token, 1);
        }
      }
    });
    this.adminService.runCode(this.language, this.problemData.example3_in, this.problemData.example3_out, editorContent).subscribe({
      next: (response3: any) => {
        if (response3 && response3.body) {
          this.checkSubmitSubmission(response3.body.token, 2);
        }
      }
    });
  }

  checkSubmitSubmission(token: string, section: number) {
    this.adminService.submitToken(token).subscribe({
      next: (result: any) => {
        if (result && result.body) {
          if (result.body.status.id == 2 || result.body.status.id == 1) {
            setTimeout(() => {
              this.checkSubmitSubmission(token, section);
            }, 1000);
          } else {
            this.submitInProg = false;
            if (section === 1) {
              //console.log('Final Result submit 1', result);
              this.successfulSubmit = true;
              this.SubSubStatus = result.body.status.description;
              this.subTime = result.body.time;
              this.subMemory = result.body.memory;
              this.languageId = result.body.language.name;

              setTimeout(() => {
                if (result.body.status.id !== 3) {
                  this.hiddenTestCase1.nativeElement.style.color = "red";
                } else {
                  this.hiddenTestCase1.nativeElement.style.color = "green";
                }
              });
            } else {
              //console.log('Final Result submit 2', result);
              this.successfulSubmit = true;
              this.Substatus = result.body.status.description;
              this.time = result.body.time;
              this.memory = result.body.memory;
              this.languageId = result.body.language.name;
              setTimeout(() => {
                if (result.body.status.id !== 3) {
                  this.hiddenTestCase2.nativeElement.style.color = "red";
                } else {
                  this.hiddenTestCase2.nativeElement.style.color = "green";
                }
              });
            }
          }
        }
      }
    });
  }

  logout() {
    this.adminService.logout();
  }

  ngAfterViewInit() {
    const resizable = (resizer: HTMLElement) => {
      const direction = resizer.getAttribute('data-direction') || 'horizontal';
      const prevSibling = resizer.previousElementSibling as HTMLElement;
      const nextSibling = resizer.nextElementSibling as HTMLElement;

      let x = 0;
      let y = 0;
      let prevSiblingHeight = 0;
      let prevSiblingWidth = 0;

      const mouseDownHandler = (e: MouseEvent) => {
        x = e.clientX;
        y = e.clientY;
        const rect = prevSibling.getBoundingClientRect();
        prevSiblingHeight = rect.height;
        prevSiblingWidth = rect.width;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        switch (direction) {
          case 'vertical':
            const h = ((prevSiblingHeight + dy) * 100) / resizer.parentElement!.getBoundingClientRect().height;
            prevSibling.style.height = h + '%';
            break;
          case 'horizontal':
          default:
            const w = ((prevSiblingWidth + dx) * 100) / resizer.parentElement!.getBoundingClientRect().width;
            prevSibling.style.width = w + '%';
            break;
        }

        const cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
        resizer.style.cursor = cursor;
        document.body.style.cursor = cursor;

        prevSibling.style.userSelect = 'none';
        prevSibling.style.pointerEvents = 'none';

        nextSibling.style.userSelect = 'none';
        nextSibling.style.pointerEvents = 'none';
      };

      const mouseUpHandler = () => {
        resizer.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        prevSibling.style.removeProperty('user-select');
        prevSibling.style.removeProperty('pointer-events');

        nextSibling.style.removeProperty('user-select');
        nextSibling.style.removeProperty('pointer-events');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      resizer.addEventListener('mousedown', mouseDownHandler);
    };

    this.el.nativeElement.querySelectorAll('.resizer').forEach((ele: HTMLElement) => {
      resizable(ele);
    });
  }
}
