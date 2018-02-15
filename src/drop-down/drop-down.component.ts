import { CommonModule, NgForOf } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";
import { IgxInputModule,  IgxListModule, IgxToggleModule } from "../main";
@Component({
    selector: "igx-drop-down",
    templateUrl: "./drop-down.component.html"
})
export class IgxDropDownComponent {
    @Input()
    public data = [];

    @Input()
    public textKey: string;

    @Input()
    public valueKey: string;
}

@NgModule({
    declarations: [IgxDropDownComponent],
    exports: [IgxDropDownComponent],
    imports: [IgxToggleModule, IgxInputModule, IgxListModule, CommonModule]
})
export class IgxDropDownModule {}
