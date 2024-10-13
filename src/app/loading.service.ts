import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private componentLoadingSubjects = new Map<string, BehaviorSubject<boolean>>();

  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  setComponentLoading(componentId: string, loading: boolean): void {
    if (!this.componentLoadingSubjects.has(componentId)) {
      this.componentLoadingSubjects.set(componentId, new BehaviorSubject<boolean>(false));
    }
    this.componentLoadingSubjects.get(componentId)?.next(loading);
  }

  getComponentLoading$(componentId: string): Observable<boolean> {
    if (!this.componentLoadingSubjects.has(componentId)) {
      this.componentLoadingSubjects.set(componentId, new BehaviorSubject<boolean>(false));
    }
    return this.componentLoadingSubjects.get(componentId)!.asObservable();
  }
}
