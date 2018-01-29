import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IgxToggleBoxModule, IgxTogglerDirective } from "./toggler.directive";

fdescribe("IgxToggler", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                IgxTogglerDirective,
                IgxTogglerTestClass
            ]
        })
        .compileComponents();
    }));
    it("IgxTogglerDirective is defined", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(IgxTogglerDirective))).toBeDefined();
        expect(fixture.debugElement.query(By.css("ul"))).toBeDefined();
        expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(4);
    });
    it("verify that initially toggled content is hidden", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        const divEl = fixture.debugElement.query(By.directive(IgxTogglerDirective)).nativeElement;
        expect(divEl.classList.contains("hidden")).toBeTruthy();
    });
    it("should emit 'onOpen' event", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        const toggler = fixture.componentInstance.toggler;
        spyOn(toggler.onOpen, "emit");
        toggler.onOpen.emit();
        fixture.detectChanges();

        expect(toggler.onOpen.emit).toHaveBeenCalled();
    });
    it("should emit 'onClose' event", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        const toggler = fixture.componentInstance.toggler;
        spyOn(toggler.onClose, "emit");
        toggler.onClose.emit();
        fixture.detectChanges();

        expect(toggler.onClose.emit).toHaveBeenCalled();
    });
    it("should show the content and emit 'onOpen' event when open button is clicked", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        const divEl = fixture.debugElement.query(By.directive(IgxTogglerDirective));
        const dir = divEl.injector.get(IgxTogglerDirective) as IgxTogglerDirective;
        spyOn(dir.onOpen, "emit");
        const openButton = fixture.debugElement.query(By.css("#openBtn")).nativeElement;
        openButton.click();
        fixture.detectChanges();

        expect(dir.onOpen.emit).toHaveBeenCalled();
        expect(divEl.nativeElement.classList.contains("hidden")).toBeFalsy();
    });
    it("should hide the content when close button is clicked", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        const divEl = fixture.debugElement.query(By.directive(IgxTogglerDirective)).nativeElement;
        const closeButton = fixture.debugElement.query(By.css("#closeBtn")).nativeElement;
        closeButton.click();
        fixture.detectChanges();

        expect(divEl.classList.contains("hidden")).toBeTruthy();
    });
    it("should hide content when you click outside the toggler's content", () => {
        const fixture = TestBed.createComponent(IgxTogglerTestClass);
        fixture.detectChanges();

        const container = fixture.componentInstance;
        const divEl = fixture.debugElement.query(By.directive(IgxTogglerDirective));
        const dir = divEl.injector.get(IgxTogglerDirective) as IgxTogglerDirective;
        spyOn(dir.onClose, "emit");
        const openButton = fixture.debugElement.query(By.css("#openBtn")).nativeElement;
        openButton.click();
        fixture.detectChanges();

        expect(divEl.nativeElement.classList.contains("hidden")).toBeFalsy();

        const divC = fixture.debugElement.queryAll(By.css("div"));
        divC[1].nativeElement.click();
        fixture.detectChanges();

        expect(dir.onClose.emit).toHaveBeenCalled();
        expect(divEl.nativeElement.classList.contains("hidden")).toBeTruthy();
    });
});

@Component({
    template: `
    <button id="openBtn" (click)="togglerRef.open()">Open</button>
    <button id="closeBtn" (click)="togglerRef.close()">Close</button>
    <div igx-toggler #togglerRef="toggler" (onOpen)="open()" (onClose)="close()">
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
export class IgxTogglerTestClass {
    @ViewChild(IgxTogglerDirective) public toggler: IgxTogglerDirective;

    public open() {}
    public close() {}
}
