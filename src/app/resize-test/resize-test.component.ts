import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-resize-test',
  standalone: true,
  templateUrl: './resize-test.component.html',
  styleUrls: ['./resize-test.component.scss']
})
export class ResizeTestComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

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
