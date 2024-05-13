import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResizerService {
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;

  startResizing(event: MouseEvent, direction: string, prevSibling: HTMLElement, nextSibling: HTMLElement) {
    event.preventDefault();

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = prevSibling.offsetWidth;
    this.startHeight = prevSibling.offsetHeight;

    const mouseMoveHandler = (e: MouseEvent) => {
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;

      switch (direction) {
        case 'vertical':
          const newHeight = this.startHeight + dy;
          prevSibling.style.height = newHeight + 'px';
          nextSibling.style.height = `calc(100% - ${newHeight}px)`;
          break;
        case 'horizontal':
        default:
          const newWidth = this.startWidth + dx;
          prevSibling.style.width = newWidth + 'px';
          nextSibling.style.width = `calc(100% - ${newWidth}px)`;
          break;
      }
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }
}
