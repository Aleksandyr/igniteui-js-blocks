import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { async, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IgxToggleActionDirective, IgxToggleDirective, IgxToggleModule } from "./toggle.directive";

fdescribe("IgxToggler", () => {
    const HIDDEN_TOGGLER_CLASS = "igx-toggle-hidden";
    const TOGGLER_CLASS = "igx-toggle";
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                IgxToggleActionDirective,
                IgxToggleActionTestClass,
                IgxToggleDirective,
                IgxToggleTestClass
            ],
            imports: [BrowserAnimationsModule]
        })
        .compileComponents();
    }));
    it("IgxToggleDirective is defined", () => {
        const fixture = TestBed.createComponent(IgxToggleTestClass);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(IgxToggleDirective))).toBeDefined();
        expect(fixture.debugElement.query(By.css("ul"))).toBeDefined();
        expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(4);
    });
    it("verify that initially toggled content is hidden", () => {
        const fixture = TestBed.createComponent(IgxToggleTestClass);
        fixture.detectChanges();
        const divEl = fixture.debugElement.query(By.directive(IgxToggleDirective)).nativeElement;
        expect(divEl.classList.contains(HIDDEN_TOGGLER_CLASS)).toBeTruthy();
    });
    it("should show and hide contenct according 'collapsed' attribute", () => {
        const fixture = TestBed.createComponent(IgxToggleTestClass);
        fixture.detectChanges();

        const divEl = fixture.debugElement.query(By.directive(IgxToggleDirective)).nativeElement;
        expect(fixture.componentInstance.isClosed).toBe(true);
        fixture.componentInstance.isClosed = false;
        fixture.detectChanges();

        expect(fixture.componentInstance.isClosed).toBe(false);
        expect(divEl.classList.contains(TOGGLER_CLASS)).toBeTruthy();
    });
    it("should emit 'onOpen' event", () => {
        const fixture = TestBed.createComponent(IgxToggleTestClass);
        fixture.detectChanges();

        const toggle = fixture.componentInstance.toggle;
        spyOn(toggle.onOpen, "emit");
        toggle.open();
        fixture.detectChanges();

        expect(toggle.onOpen.emit).toHaveBeenCalled();
    });
    it("should emit 'onClose' event", () => {
        const fixture = TestBed.createComponent(IgxToggleTestClass);
        fixture.detectChanges();
        const toggle = fixture.componentInstance.toggle;
        fixture.componentInstance.isClosed = false;
        fixture.detectChanges();

        spyOn(toggle.onClose, "emit");
        toggle.close();
        fixture.detectChanges();

        expect(toggle.onClose.emit).toHaveBeenCalled();
    });
    it("IgxToggleAction ---------", fakeAsync(() => {
        const fixture = TestBed.createComponent(IgxToggleActionTestClass);
        fixture.detectChanges();
        fixture.debugElement.componentInstance.isClosed = true;
        tick();
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.directive(IgxToggleActionDirective)).nativeElement;
        const divEl = fixture.debugElement.query(By.directive(IgxToggleDirective)).nativeElement;
        expect(divEl.classList.contains(HIDDEN_TOGGLER_CLASS)).toBeTruthy();
        button.click();
        tick();
        fixture.detectChanges();

        expect(divEl.classList.contains(TOGGLER_CLASS)).toBeTruthy();

    }));
    it("2 IgxToggleAction ---------", fakeAsync(() => {
        const fixture = TestBed.createComponent(IgxToggleActionTestClass);
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.directive(IgxToggleActionDirective)).nativeElement;
        const divEl = fixture.debugElement.query(By.directive(IgxToggleDirective)).nativeElement;
        expect(fixture.debugElement.componentInstance.isClosed).toBeFalsy();
        expect(divEl.classList.contains(TOGGLER_CLASS)).toBeTruthy();
        button.click();
        tick();
        fixture.detectChanges();
        tick(2000);

        expect(divEl.classList.contains(HIDDEN_TOGGLER_CLASS)).toBeTruthy();
    }));
/*     it("should hide content when you click outside the toggler's content", fakeAsync(() => {
        const fixture = TestBed.createComponent(IgxToggleActionTestClass);
        fixture.detectChanges();

        const divEl = fixture.debugElement.query(By.directive(IgxToggleDirective)).nativeElement;
        expect(fixture.debugElement.componentInstance.isClosed).toBeFalsy();
        expect(divEl.classList.contains(TOGGLER_CLASS)).toBeTruthy();
        const divC = fixture.debugElement.queryAll(By.css("div"));
        divC[1].nativeElement.click();
        tick();
        fixture.detectChanges();

        expect(divEl.nativeElement.classList.contains(HIDDEN_TOGGLER_CLASS)).toBeTruthy();
    })); */
});

@Component({
    template: `
    <div igx-toggle #toggleRef="toggle" [collapsed]="isClosed" (onOpen)="open()" (onClose)="close()">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
    `
})
export class IgxToggleTestClass {
    @ViewChild(IgxToggleDirective) public toggle: IgxToggleDirective;
    public isClosed = true;
    public open() {}
    public close() {}
}
@Component({
    template: `
    <button igx-toggle-action [igx-toggle-action]="toggleRef">Open/Close Toggle</button>
    <div igx-toggle #toggleRef="toggle" [collapsed]="isClosed">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
    <div></div>
    `
})
export class IgxToggleActionTestClass {
    public isClosed = false;
    @ViewChild(IgxToggleDirective) public toggle: IgxToggleDirective;
}
